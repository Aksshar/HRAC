import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-hall-reservation',
  templateUrl: './hall-reservation.component.html',
  styleUrls: ['./hall-reservation.component.css']
})
export class HallReservationComponent implements OnInit {
  closeResult: string;

  bookingForm: FormGroup;
  constructor(private modalService: NgbModal,private fb: FormBuilder, private afs: AngularFirestore) { }

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

}
