import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MustMatch } from './validators';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take, debounceTime} from 'rxjs/Operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';


@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
    constructor(private formBuilder: FormBuilder, private afs: AngularFirestore, private auth: AuthService) {
    }
    ngOnInit() {
  
    this.signupForm = this.formBuilder.group({
      IndexNumber:  ['', [
        Validators.required
      ],CustomIndexValidator.IndexNumber(this.afs)],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', Validators.required] }, 
          { validator: MustMatch('password', 'confirmPassword')})
    };

  get f() { return this.signupForm.controls; }

  get IndexNumber() {
    return this.signupForm.get('IndexNumber')
  }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }
    else {
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      const IndexNumber = this.signupForm.value.IndexNumber;
      this.auth.Register(email, password,IndexNumber);
    }
}
}


export class CustomIndexValidator {
  static IndexNumber(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      
    const IndexNumber = control.value;
  
    return afs.collection('studentIndex', ref => ref.where('IndexNumber', '==', IndexNumber) )        
    .valueChanges().pipe(
      debounceTime(500),
      take(1),
      map(arr => arr.length ? null : { IndexNumberAvailable: false } ),
    )

    }
  }
}

