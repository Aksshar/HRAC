import { AttendanceService } from './../attendance.service';
import { DateService } from './../date.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'; 
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { NgbDateStruct,NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Dates } from './dates';

@Component({
  selector: 'app-currentsemester',
  templateUrl: './currentsemester.component.html',
  styleUrls: ['./currentsemester.component.css']
})
export class CurrentsemesterComponent implements OnInit {
  Dates: any;
  timetableForm: FormGroup;
  list: Dates[];
  constructor(private db:AngularFirestore, private fb:FormBuilder, private dateservice: DateService, private attendance:AttendanceService) { }
  model: NgbDateStruct;
  
  selectDates() {
    return this.db.collection("Dates").add(this.model).then(function (docRef) {
    });
  }

  ngOnInit() {
    this.timetableForm = this.fb.group({
      subjectCode: ['', [Validators.required]],
      academicYear: ['', [Validators.required]],
      stream: ['',[Validators.required]],
      lectureHall: ['', [Validators.required]],
      lecturer: ['', [Validators.required]],
      startingtime: [''],
      endingtime: ['']
    });
    


    this.dateservice.getUsers().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Dates;
      })
    });


  
  }


  onDelete(id: string) {
      this.db.doc('Dates/' + id).delete();
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

  get stream() {
    return this.timetableForm.get('stream');
  }
  get lecturer() {
    return this.timetableForm.get('lecturer');
  }

  onSubmit() {
    if (this.timetableForm.invalid) {
      return;
  }
  else {
    const subjectCode = this.timetableForm.value.subjectCode;
    const academicYear = this.timetableForm.value.academicYear;
    const lectureHall = this.timetableForm.value.lectureHall;
    const lecturer = this.timetableForm.value.lecturer;   
    const startingtime = this.timetableForm.value.startingtime;
    const endingtime = this.timetableForm.value.endingtime;
    const stream = this.timetableForm.value.stream;  
    this.attendance.insertTimeTable(subjectCode, academicYear, lectureHall, lecturer, this.list, startingtime, endingtime,stream);
      for (let del of this.list) this.db.collection('Dates').doc(del.id).delete(); 
      this.attendance.generateStudents(subjectCode, academicYear, this.list,stream);
    this.timetableForm.reset();  
  }
  }

}
