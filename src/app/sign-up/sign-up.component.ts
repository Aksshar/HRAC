import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  constructor() { }

  ngOnInit() {
  }

}
