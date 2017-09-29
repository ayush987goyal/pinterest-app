import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { MongoService } from '../../mongo.service';

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

  constructor(private userService: UserService, private router: Router, private mongoService: MongoService) { }

  ngOnInit() {
    let user = this.userService.userDetailsById(this.interestDetails.user);
    this.userName = user.name;
    this.userPic = user.pic;
    this.mainImg = this.interestDetails.img;
  }

  brokenUrl() {
    this.mainImg = "http://cumbrianrun.co.uk/wp-content/uploads/2014/02/default-placeholder.png";
  }

  brokenAvatar() {
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
      },
      (err) => { console.log(err); }
    );
  }

}
