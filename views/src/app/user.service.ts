import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';

@Injectable()
export class UserService {

  userId: string = '';
  userName: string = '';
  userEmail: string = '';
  userImg: string = '';
  userInterests: string[] = [];
  allUsersList: any[] = [];

  constructor(private mongoService: MongoService) { }

  setUserId() {
    this.mongoService.findUserByEmail(this.userEmail).subscribe(
      (res) => {
        let userData = res.data['findUser'];
        this.userId = userData._id;
        this.userInterests = userData.interests;

        if (!userData) {
          this.mongoService.addNewUser(this.userName, this.userEmail, this.userImg).subscribe(
            (resp) => {
              this.userId = resp.data['addUser'];
            },
            (err) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  userDetailsById(id: string) {
    let pos = this.allUsersList.map(e => {return e._id}).indexOf(id);
    return this.allUsersList[pos];
  }


}
