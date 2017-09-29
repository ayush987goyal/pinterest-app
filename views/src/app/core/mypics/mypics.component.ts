import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { MongoService } from '../../mongo.service';

@Component({
  selector: 'app-mypics',
  templateUrl: './mypics.component.html',
  styleUrls: ['./mypics.component.css']
})
export class MypicsComponent implements OnInit {

  isLoading: boolean = false;
  myInterestList: any;

  constructor(private userService: UserService, private mongoService: MongoService) { }

  ngOnInit() {
    this.isLoading = true;
    this.mongoService.getInterestsOfaUser(this.userService.userId).subscribe(
      (data) => {
        this.myInterestList = data.data['getInterestsOfUser'];
        this.isLoading = false;
      },
      (err) => { console.log(err); }
    );
  }

}
