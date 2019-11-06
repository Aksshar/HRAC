import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'; 
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-currentsemester',
  templateUrl: './currentsemester.component.html',
  styleUrls: ['./currentsemester.component.css']
})
export class CurrentsemesterComponent implements OnInit {
  Dates: any;
  timetableForm: FormGroup;
  constructor(private db:AngularFirestore, private fb:FormBuilder) { }
  time = { hour: 13, minute: 30 };
  model: NgbDateStruct;
  
  selectDates() {
    return this.db.collection("Dates").add(this.model).then(function (docRef) {
      console.log("Date written: ", docRef.id);
    });
  }

  delete(Date) {
    console.log(Date);
    return this.db.collection("Dates").doc('Date').delete();
  }

  toggleMeridian(time) {
    this.time = time;
    console.log(time);
  }
  ngOnInit() {
    this.timetableForm = this.fb.group({
      subjectCode: ['', [Validators.required]],
      academicYear: ['', [Validators.required]],
      lectureHall: ['', [Validators.required]],
    });
      
  }

  get subjectCode() {
    return this.timetableForm.get('subjectCode');
  }

  get academicYear() {
    return this.timetableForm.get('academicYear');
  }

  get lectureHall() {
    return this.timetableForm.get('lectureHall');
  }

  onSubmit(){
  }

}


