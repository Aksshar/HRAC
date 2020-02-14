import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore} from 'angularfire2/firestore';
import { ManagebookingService } from '../managebooking.service';


//import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})


export class ManageBookingComponent implements OnInit{


  constructor(private service: ManagebookingService,private afs: AngularFirestore) { }
 
  ngOnInit() {
    /*this.service.getEmployees().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() 
        } as request;
      })
    });*/
    this.getUsers1();
    this.getUsers2();
    this.getUsers3();
  }
  list1;
  list2;
  list3;

  getUsers1 = () =>
  this.service.getRequest()
    .subscribe(res => (this.list1 = res)
    );
  getUsers2 = () =>
  this.service.getConfirm()
    .subscribe(res => (this.list2 = res)
    );
  getUsers3 = () =>
  this.service.getReject()
    .subscribe(res => (this.list3 = res)
    );

confirm(){
  /*insert(data);
  return this.afs.collection("new_booking_requests").doc(data.payload.doc.id).delete();
}

reject(){
  
  return this.afs.collection("new_booking_requests").doc(data.payload.doc.id).delete();
}*/

}
 