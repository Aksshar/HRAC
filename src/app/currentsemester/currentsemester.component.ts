import { DateService } from './../date.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'; 
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private db:AngularFirestore, private fb:FormBuilder, private dateservice: DateService) { }
  time = { hour: 13, minute: 30 };
  model: NgbDateStruct;
  
  selectDates() {
    return this.db.collection("Dates").add(this.model).then(function (docRef) {
    });
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
      lecturer: ['',[Validators.required]]
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

  get lecturer() {
    return this.timetableForm.get('lecturer');
  }

  onSubmit(){
  }

}


