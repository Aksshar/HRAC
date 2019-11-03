import { AngularFireAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: firebase.User;
  email;
  constructor(private router: RouterModule, public authService: AuthService, private afAuth: AngularFireAuth) {
   afAuth.authState.subscribe(res => {
    if (res && res.uid) {
      console.log('user is logged in');
      this.email = res.email;
    } else {
      console.log('user not logged in');
    }
  });
   }
   

  ngOnInit() {
  }

}
