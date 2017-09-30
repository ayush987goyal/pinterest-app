import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { MongoService } from '../../mongo.service';
import { SocketService } from '../../socket.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestComponent implements OnInit {

  @Input() interestDetails: any;

  userName: string = '';
  userPic: string = '';
  mainImg: string = '';
  votedBy: string[] = [];
  voteCount: number;

  voteConnection;

  constructor(private userService: UserService, private router: Router, private mongoService: MongoService,
    private socketService: SocketService, private authService: AuthService) { }

  ngOnInit() {
    let user = this.userService.userDetailsById(this.interestDetails.user);
    this.userName = user.name;
    this.userPic = user.pic;
    this.mainImg = this.interestDetails.img;
    this.voteCount = this.interestDetails.voteCount;
    for (const item of this.interestDetails.votedBy) {
      this.votedBy.push(item);
    }
    this.socketService.getVoteChanged().subscribe(
      (data) => {
        if(data['interestId'] === this.interestDetails._id) {
          this.voteCount = data['voteCount'];
          this.votedBy = data['userId'];
        }
      }
    );
    // this.votedBy = this.interestDetails.votedBy;
  }

  brokenUrl(event) {
    this.mainImg = "http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png";
  }

  brokenAvatar(event) {
    this.userPic = "http://style.anu.edu.au/_anu/4/images/placeholders/person.png";
  }

  isOwner() {
    return (this.userService.userId === this.interestDetails.user);
  }

  onUserClick() {
    this.router.navigate(['/mypics', this.interestDetails.user]);
  }

  onDelete() {
    this.mongoService.deleteInterest(this.interestDetails._id, this.userService.userId).subscribe(
      (data) => {
        console.log(data);
        this.socketService.removeInterest(this.interestDetails._id);
      },
      (err) => { console.log(err); }
    );
  }

  hasVoted() {
    let pos = this.votedBy.indexOf(this.userService.userId);
    if (pos < 0) {
      return false;
    } else {
      return true;
    }
    // return true;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onVote() {
    if (this.hasVoted()) {
      this.voteCount--;
      let pos = this.votedBy.indexOf(this.userService.userId);
      this.votedBy.splice(pos, 1);
    } else {
      this.voteCount++;
      this.votedBy.push(this.userService.userId);
    }
    this.mongoService.updateTheVote(this.interestDetails._id, this.votedBy, this.voteCount).subscribe(
      (res) => {
        console.log(res);
        this.socketService.changeVote(this.interestDetails._id, this.votedBy, this.voteCount);
      },
      (err) => { console.log(err);}
    );
  }

}
