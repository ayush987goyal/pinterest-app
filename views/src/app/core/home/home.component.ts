import { Component, OnInit } from '@angular/core';
import { MongoService } from '../../mongo.service';
import { SocketService } from '../../socket.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allInterestList: any[] = [];
  isLoading: boolean = false;

  addConnection;
  removeConnection;

  constructor(private mongoService: MongoService, private socketService: SocketService, private userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.mongoService.getAllInterests().subscribe(
      (data) => {
        for(let item of data.data['allInterests']){
          this.allInterestList.push(item);
        }
      },
      (err) => { console.log(err); }
    );

    this.mongoService.getAllUsers().subscribe(
      (data) => {
        for (const item of data.data['allUsers']) {
          this.userService.allUsersList.push(item);
        }
        this.isLoading = false;
      },
      (err) => { console.log(err); }
    );

    this.addConnection = this.socketService.getInterestAdded().subscribe(
      (interestData) => {
        this.allInterestList.push(interestData);
      }
    );

    this.removeConnection = this.socketService.getInterestremoved().subscribe(
      (interestId) => {
        // console.log(interestId);
        let pos = this.allInterestList.map(e => {return e._id}).indexOf(interestId);
        // console.log(pos);
        this.allInterestList.splice(pos, 1);
      }
    );
  }

  ngOnDestroy() {
    this.addConnection.unsubscribe();
    this.removeConnection.unsubscribe();
  }

}
