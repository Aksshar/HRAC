import { AttendanceService } from './../attendance.service';
import { ToastrService } from 'ngx-toastr';
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
  bookings;
  constructor(private db:AngularFirestore, private fb:FormBuilder, private dateservice: DateService, private attendance:AttendanceService,private toastr: ToastrService) { }
  model: NgbDateStruct;
  

  startingtime;
  endingtime;
  lectureHal;
  onKeys(event: any) { // without type info
    this.startingtime = event.target.value;
  }

  onKeye(event: any) { // without type info
    this.endingtime = event.target.value;
  }

  onKeyh(event: any) { // without type info
    this.lectureHal = event.target.value;
  }
  
  selectDates() {
    this.db.collection('confirmed_bookings').valueChanges().subscribe(ref => {
      this.bookings = ref;
      let sstring = this.model.year + '-' + this.model.month + '-' + this.model.day + ' ' + this.startingtime;
      let estring = this.model.year + '-' + this.model.month + '-' + this.model.day + ' ' + this.endingtime;
      let stime = new Date(sstring);
      let etime = new Date(estring);
      let status = 'true';
      for (let date of this.bookings)
      {
        let s = date.date + ' ' + date.startingtime;
        let e = date.date+' '+date.endingtime;
        let bstime = new Date(s);
        let betime = new Date(e);
        console.log(bstime);
        console.log('poda : ' + stime);
        console.log(+stime >= +betime && +etime <= +betime);
        console.log(date.lectureHall !== this.lectureHal);
        if (date.lectureHall === this.lectureHal)
        { 
          if (+stime >= +bstime && +etime <= +betime)
          {
            status = 'false';
            console.log(status);
          }
          else if (+stime <= +bstime && +etime >= +betime)
          {
            status = 'false';
            console.log(status);
          }
        }
      }
      if (status==='true')
      {
        return this.db.collection("Dates").add(this.model);
      }
      else
      {
        this.toastr.warning('time slot already booked!');
      }
      
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
  
    this.db.collection('Dates')
    .snapshotChanges().subscribe(serverItems => {
      this.list = [];
      serverItems.forEach(a => {
        let item:any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.list.push(item);
      });
    });

  }


  onDelete(item) {
    this.db.collection('Dates').doc(item.id).delete();
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
    this.attendance.generateStudents(subjectCode, academicYear, this.list, stream);
      this.attendance.insertsubeject(subjectCode, academicYear);  
    this.attendance.confirmBooking(subjectCode, lectureHall, this.list, startingtime, endingtime);
    this.timetableForm.reset();  
      for(let del of this.list) {
        this.db.collection('Dates').doc(del.id).delete();
        this.list.pop();
        console.log('deleted');
      }
  }
  }

}
