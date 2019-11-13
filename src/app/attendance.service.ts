import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private db:AngularFirestore) { }

  insertTimeTable(subjectCode, academicYear, lectureHall, lecturer, list, startingtime, endingtime) {
    return this.db.collection("Timetable").add({
      subjectCode: subjectCode,
      academicYear: academicYear,
      lectureHall: lectureHall,
      lecturer: lecturer,
      Dates: list,
      startingtime: startingtime,
      endingtime: endingtime
    }).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
    }
  }

