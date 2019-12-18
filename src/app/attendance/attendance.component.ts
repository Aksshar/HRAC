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
  clicked_subject;
  total_count;
  at_count;
  constructor(private db: AngularFirestore, public authService: AuthService, private afAuth: AngularFireAuth,private UserAf:UserAttendanceService) {
    afAuth.authState.subscribe(user => this.user = user);

    
   }

  ngOnInit() {
    console.log(this.user.email);
    this.db.collection('user', ref => ref.where('email', '==',this.user.email)).valueChanges().subscribe(val => {
      this.IndexObject = val;
      for (let index of this.IndexObject) {
        this.IndexNumber = index.IndexNumber;
      }
      console.log(this.IndexNumber);
      this.db.collection('studentIndex', ref => ref.where('IndexNumber', '==',this.IndexNumber)).valueChanges().subscribe(val => {
        this.studentObject = val;
        for (let ind of this.studentObject) {
          this.year = ind.academicYear;
          this.stream = ind.stream;
        }
        console.log(this.year);
        console.log(this.stream);
        this.db.collection('Timetable', ref => ref.where('academicYear', '==', this.year).where('stream', '==', this.stream)).valueChanges().subscribe(val => {
          this.subjectCodes = val;
        });
      });
    });
    
  }

  getDates(subjectCode,IndexNumber) {
    this.clicked_subject = subjectCode;
    console.log(this.clicked_subject);
    this.db.collection(subjectCode).valueChanges().subscribe(val => {
      this.final = val;
      console.log(this.final);
      this.total_count = 0;
      this.at_count = 0;
      for (let i of this.final) {
        if (i.IndexNumber === IndexNumber)
        {
          this.total_count = this.total_count + 1;
          if (i.isAttended) this.at_count = this.at_count + 1;
        }
      }
    });
  }

}
