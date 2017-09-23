import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  isValid: boolean = false;
  userName: string = '';
  userEmail: string = '';
  providerTwitter = new firebase.auth.TwitterAuthProvider();
  token: string;

  constructor(private http: Http, private zone: NgZone, private router: Router) { }

  onSignInTwitter() {
    firebase.auth().signInWithPopup(this.providerTwitter).then((result) => {
      this.token = result.credential.accessToken;
      this.userName = result.additionalUserInfo.profile.name;
      this.userEmail = result.additionalUserInfo.username;
      // console.log(result);

      this.zone.run(() => {
        this.router.navigate(['']);
      })
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    })
  }

  onSignOut() {
    firebase.auth().signOut();
    this.token = null;
    this.userEmail = '';
    this.userName = '';

    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.token != null;
  }
}
