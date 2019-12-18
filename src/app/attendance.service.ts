import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { generate } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private db:AngularFirestore,private toastr: ToastrService) { }

  insertTimeTable(subjectCode, academicYear, lectureHall, lecturer, list, startingtime, endingtime,stream) {
    return this.db.collection("Timetable").add({
      subjectCode: subjectCode,
      academicYear: academicYear,
      lectureHall: lectureHall,
      lecturer: lecturer,
      Dates: list,
      startingtime: startingtime,
      endingtime: endingtime,
      stream: stream

    }).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  }
  
  indexes;

  generateStudents(subjectCode, academicYear, list,stream) {
    this.db.collection('studentIndex', ref => ref.where('year', '==', academicYear).where('stream','==',stream)).valueChanges().subscribe(val => {
      this.indexes = val;
      console.log(this.indexes);
      for (let date of list) {
        let dateString = date.year.toString() + '-' + date.month.toString() + '-' + date.day.toString();
        for (let index of this.indexes) {
          this.db.collection(subjectCode).add({
            date:dateString,
            IndexNumber: index.IndexNumber,
            isAttended: false
          });
          
        }
        
      } 
    });
   
    
  }

  }

