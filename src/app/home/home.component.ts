import { AuthService } from './../auth.service';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: firebase.User;
  constructor(private router: RouterModule, public authService: AuthService, private afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

}
