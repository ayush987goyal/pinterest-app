import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {

  providerTwitter = new firebase.auth.TwitterAuthProvider();
  token: string;

  constructor(private http: Http, private zone: NgZone, private router: Router, private userService: UserService) { }

  onSignInTwitter() {
    firebase.auth().signInWithPopup(this.providerTwitter).then((result) => {
      this.token = result.credential.accessToken;
      this.userService.userName = result.additionalUserInfo.profile.name;
      this.userService.userEmail = result.additionalUserInfo.username;
      this.userService.userImg = result.additionalUserInfo.profile.profile_image_url;
      // console.log(result.additionalUserInfo);
      this.userService.setUserId();

      this.zone.run(() => {
        this.router.navigate(['/']);
      })
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    })
  }

  onSignOut() {
    firebase.auth().signOut();
    this.token = null;
    this.userService.userEmail = '';
    this.userService.userName = '';
    this.userService.userImg = '';
    this.userService.userInterests = [];
    this.userService.userId = '';

    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.token != null;
  }
}
