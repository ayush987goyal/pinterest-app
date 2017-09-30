import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user.service';
import { MongoService } from '../../mongo.service';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dialogVisible: boolean = false;
  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService, private userService: UserService, private mongoService: MongoService,
     private socketService: SocketService, private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  onSignIn() {
    this.router.navigate(['/dummy']);
    this.authService.onSignInTwitter();
  }

  onSignOut() {
    this.authService.onSignOut();
  }

  onAdd() {
    this.dialogVisible = false;
    this.mongoService.addNewInterest(this.form.value.title, this.form.value.url, this.userService.userId).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigate(['/']);
        this.socketService.addInterest(res.data['addInterest']);
      },
      (err) => {
        console.log(err);
      }
    );
    this.form.reset();
  }

}
