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

  constructor(private router: RouterModule, public authService: AuthService, private afAuth: AngularFireAuth) {
   afAuth.authState.subscribe(user => this.user = user);
   }
   

  ngOnInit() {
  }

}
