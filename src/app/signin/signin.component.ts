import { AuthService } from './../auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private afs: AngularFirestore, private auth: AuthService) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });


    if (this.auth.user$) { this.signinForm.reset();}
  }

  get f() { return this.signinForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signinForm.invalid) {
      this.signinForm.reset();
      return;
    }
    else {
      const email = this.signinForm.value.email;
      const password = this.signinForm.value.password;
      this.auth.login(email, password);
    }
  }

}
