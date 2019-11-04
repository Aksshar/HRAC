import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'; 
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-currentsemester',
  templateUrl: './currentsemester.component.html',
  styleUrls: ['./currentsemester.component.css']
})
export class CurrentsemesterComponent implements OnInit {
  RFID: any;
  timetableForm: FormGroup;
  constructor(private db:AngularFirestore, private fb:FormBuilder) { }
  time = {hour: 13, minute: 30};

  toggleMeridian(time) {
    this.time = time;
    console.log(time);
  }
  ngOnInit() {
    this.timetableForm = this.fb.group({
      subjectCode: ['', [Validators.required]],
      academicYear: ['', [Validators.required]],
      lectureHall: ['',[Validators.required]]
    });
    this.db.collection('RFID_NO').valueChanges().subscribe(val => {
      console.log(val);
      this.RFID = val;
    })
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


