import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { MongoService } from '../../mongo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mypics',
  templateUrl: './mypics.component.html',
  styleUrls: ['./mypics.component.css']
})
export class MypicsComponent implements OnInit {

  isLoading: boolean = false;
  myInterestList: any[] = [];

  constructor(private userService: UserService, private mongoService: MongoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(
      (params) => {
        let id = params.id;
        if(!id){
          id = this.userService.userId;
        }
        this.mongoService.getInterestsOfaUser(id).subscribe(
          (data) => {
            // this.myInterestList = data.data['getInterestsOfUser'];
            for (const item of data.data['getInterestsOfUser']) {
              this.myInterestList.push(item);
            }
            this.isLoading = false;
          },
          (err) => { console.log(err); }
        );
      }
    );
  }

}
