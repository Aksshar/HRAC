import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { BookingDate } from './booking-data';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-hall-reservation',
  templateUrl: './hall-reservation.component.html',
  styleUrls: ['./hall-reservation.component.css']
})
export class HallReservationComponent implements OnInit {
  user: firebase.User;
  closeResult: string;
  hallNumber;
  sub;
  public dataList: Array<BookingDate> = [];
  list;
  public selectedDate: Date = new Date();
  public currentView: View = 'Week';
  public readonly: boolean = true;
  public eventSettings: EventSettingsModel;

  bookingForm: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private afs: AngularFirestore, private _Activatedroute: ActivatedRoute, private _router: Router, private afAuth: AngularFireAuth,private toastr: ToastrService)
  {    afAuth.authState.subscribe(user => this.user = user);}

  openLg(content) {
    this.modalService.open(content,{size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.hallNumber = params.get('hallNumber');
      console.log(this.hallNumber);
      this.afs.collection('confirmed_bookings', ref => ref.where('lectureHall', '==',this.hallNumber)).valueChanges().subscribe(ref => {
        this.list = ref;
        console.log(this.list);
        for (let i of this.list) {
          let temp = new BookingDate();
          let s = i.date + ' ' + i.startingtime;
          let e = i.date + ' ' + i.endingtime;
          console.log(new Date(s));
          temp.StartTime = new Date(s);
          console.log(temp);
          temp.EndTime = new Date(e);
          temp.Subject = i.Subject;
          this.dataList.push(temp);
        }
        this.eventSettings = { dataSource: this.dataList};
      });
    });
   
    
    this.bookingForm = this.fb.group({
      selectDate: ['', [Validators.required]],
      startingtime: ['', [Validators.required]],
      endingtime: ['', [Validators.required]],
      reason: ['',[Validators.required]]
    })
  }

  temp;
  
  onSubmit() {
    let data = this.bookingForm.value;
    // let check = this.checkdate(this.bookingForm.value);
    // console.log(this.noerror);
    if (this.bookingForm.valid) {
      let status = 'true';
      let start = this.bookingForm.value.selectDate + ' ' + this.bookingForm.value.startingtime;
      let end = this.bookingForm.value.selectDate + ' ' + this.bookingForm.value.endingtime;
      let startdate = new Date(start);
      let enddate = new Date(end);
      this.afs.collection('confirmed_bookings', ref => ref.where('lectureHall', '==', this.hallNumber)).valueChanges().subscribe(ref => {
        this.temp = ref;
        console.log(this.temp);
        for (let i of this.temp) {
          let s = i.date + ' ' + i.startingtime;
          let e = i.date + ' ' + i.endingtime;
          let starttime = new Date(s);
          let endtime = new Date(e);
          if (+startdate >= +starttime && +enddate <= +endtime) {
            this.toastr.warning('time slot already booked!');
            status = 'false';
            console.log(status);
          }
          else if (+startdate <= +starttime && +enddate >= +endtime) {
            this.toastr.warning('time slot already booked!');
            status = 'false';
          }
          //+stime >= +bstime && +etime <= +betime
        }
      });

      console.log(status);
        if (status === 'true') {
          this.afs.collection('new_booking_requests').add({
            requestedDate: new Date(),
            selectDate: this.bookingForm.value.selectDate,
            startingtime: this.bookingForm.value.startingtime,
            endingtime: this.bookingForm.value.endingtime,
            reason: this.bookingForm.value.reason,
            confirmed: false,
            email: this.user.email,
            hall: this.hallNumber
          }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
        }
        this.toastr.success('booking request successfully sent!');
      }
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  onBack(): void {
    this._router.navigate(['product']);
  }
  

}
