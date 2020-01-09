import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { BookingDate } from './booking-data';




@Component({
  selector: 'app-hall-reservation',
  templateUrl: './hall-reservation.component.html',
  styleUrls: ['./hall-reservation.component.css']
})
export class HallReservationComponent implements OnInit {
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
  constructor(private modalService: NgbModal,private fb: FormBuilder, private afs: AngularFirestore, private _Activatedroute:ActivatedRoute, private _router: Router) { }

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
      this.afs.collection('booking', ref => ref.where('hallNumber', '==',this.hallNumber)).valueChanges().subscribe(ref => {
        this.list = ref;
        console.log(this.list);
        for (let i of this.list) {
          let temp = new BookingDate();
          console.log(new Date(i.stime));
          temp.StartTime = new Date(i.stime);
          console.log(temp);
          temp.EndTime = new Date(i.etime);
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

  onSubmit() {
    let data = this.bookingForm.value;
    if (this.bookingForm.valid) {
      this.afs.collection('new_booking_requests').add({
        requestedDate: new Date(),
        selectDate: this.bookingForm.value.selectDate,
        startingtime: this.bookingForm.value.startingtime,
        endingtime: this.bookingForm.value.endingtime,
        reason: this.bookingForm.value.reason,
        confirmed: false
      }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    }
    this.modalService.dismissAll('Save click');
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  onBack(): void {
    this._router.navigate(['product']);
 }

}
