import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBRPd5nmoRyvFPoKFyl-SgBI5CHARlhBaA",
      authDomain: "pinterest-app-2b5f4.firebaseapp.com"
    });
  }

  constructor(private socketService: SocketService) { }

  ngOnDestroy() {
    this.socketService.disconnectUser();
  }
}
