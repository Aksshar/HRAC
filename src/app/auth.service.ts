import { Injectable } from '@angular/core';
import { User } from 'firebase';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router, private afs: AngularFirestore, private toastr: ToastrService) {
    this.user$ = afAuth.authState;
  }
  
  async Register(email: string, password: string, IndexNumber) {
    try{
        let userCred = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        await this.afs.firestore.collection("user").doc(userCred.user.uid).set({
            email: email,
            password: password,
            IndexNumber: IndexNumber
        });
            this.router.navigate(['/']);
    } catch (e) {
        alert("Error!" + e.message);
    }
  }
  

  async  login(email: string, password: string) {

    try {
        await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        this.router.navigate(['/']);
        return false;
    } catch (e) {
      this.toastr.error(e.message);
      return true;
    }

}

async logout() {
  await this.afAuth.auth.signOut();
  localStorage.removeItem('user');
  this.router.navigate(['SignIn']);
}
  
}
