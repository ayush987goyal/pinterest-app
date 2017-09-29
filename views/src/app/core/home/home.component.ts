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

  allInterestList: any;
  isLoading: boolean = false;

  constructor(private mongoService: MongoService, private socketService: SocketService, private userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.mongoService.getAllInterests().subscribe(
      (data) => {
        this.allInterestList = data.data['allInterests'];
        // console.log(this.allInterestList);
      },
      (err) => { console.log(err); }
    );

    this.mongoService.getAllUsers().subscribe(
      (data) => {
        this.userService.allUsersList = data.data['allUsers'];
        // console.log(this.userService.allUsersList);
        this.isLoading = false;
      },
      (err) => { console.log(err); }
    );
  }

}
