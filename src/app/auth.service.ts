import { Injectable } from '@angular/core';
import { User } from 'firebase';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, public router: Router, private afs: AngularFirestore) {
    this.user$ = afAuth.authState;
  }
  
  async Register(email: string, password: string) {
    try{
        let userCred = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        await this.afs.firestore.collection("user").doc(userCred.user.uid).set({
            email: email,
            password: password
        });
            this.router.navigate(['/']);
    } catch (e) {
        alert("Error!" + e.message);
    }
}
}
