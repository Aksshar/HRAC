import { UserAttendanceService } from './../user-attendance.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  user: firebase.User;
  IndexObject;
  studentObject;
  IndexNumber;
  year;
  stream;
  subjectCodes;
  final;
  constructor(private db: AngularFirestore, public authService: AuthService, private afAuth: AngularFireAuth,private UserAf:UserAttendanceService) {
    afAuth.authState.subscribe(user => this.user = user);
   }

  ngOnInit() {
    this.db.collection('user', ref => ref.where('email', '==',this.user.email)).valueChanges().subscribe(val => {
      this.IndexObject = val;
      for (let index of this.IndexObject) {
        this.IndexNumber = index.IndexNumber;
      }
      console.log(this.IndexNumber);
      this.db.collection('studentIndex', ref => ref.where('IndexNumber', '==',this.IndexNumber)).valueChanges().subscribe(val => {
        this.studentObject = val;
        for (let ind of this.studentObject) {
          this.year = ind.year;
          this.stream = ind.stream;
        }
        console.log(this.year);
        console.log(this.stream);
        this.db.collection('Timetable', ref => ref.where('academicYear', '==', this.year).where('stream', '==', this.stream)).valueChanges().subscribe(val => {
          this.subjectCodes = val;
          for (let subject of this.subjectCodes) {
            this.db.collection(subject.subjectCode).valueChanges().subscribe(val => {
              this.final = val;
              console.log(this.final);
            });
          }
        });
      });
    });
    
  }

}
