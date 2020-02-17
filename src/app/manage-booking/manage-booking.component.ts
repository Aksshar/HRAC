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
    //this.getUsers2();
    //this.getUsers3();
  }
  list1;
  list2;
  list3;

  getUsers1 = () =>
  this.service.getRequest()
    .subscribe(res => (
      this.list1 = res)
    );
  /*getUsers2 = () =>
  this.service.getConfirm()
    .subscribe(res => (this.list2 = res)
    );
  getUsers3 = () =>
  this.service.getReject()
    .subscribe(res => (this.list3 = res)
    );
*/
confirm(order){
  
  var doc=this.afs.collection("new_booking_requests").doc(order.payload.doc.id);
  this.afs.collection("new_booking_requests").doc(order.payload.doc.id).update({confirmed:true});
  const dat= doc.get().subscribe(function(doc){doc.data();
    console.log(doc.data()); 
  });
 
  //this.afs.collection("new_booking_requests").doc(order.payload.doc.id).delete();

  
  //isNotAvailableHalls(order){
    //this.afs.collection("Halls").doc(order.payload.doc.id).update({isAvailable:false});
  
    //var data =doc.data()
      /*'SelectDate':doc.data().selectDate,
      'Startingtime':doc.data().startingtime,
      'Endingtime':doc.data().endingtime,
    'Reason':doc.data(). reason   } 
    });*/
   // this.afs.collection("new_booking_requests").doc(data.payload.doc.id).delete();
  //this.afs.collection("confirmed_bookings").add(dat).then(function(docRef) {
    //console.log("Document written with ID: ", docRef.id);
    
//});
   
}


rejectrequest(order){
  var doc=this.afs.collection("new_booking_requests").doc(order.payload.doc.id);
  this.afs.collection("new_booking_requests").doc(order.payload.doc.id).update({rejected:true});
  doc.get().subscribe(function(doc){
    console.log(doc.data());
  });
  //this.afs.collection("new_booking_requests").doc(order.payload.doc.id).delete();
  //get().subscribe(res=>{doc=>{
    //ar data =doc.data()
      /*'SelectDate':doc.data().selectDate,
      'Startingtime':doc.data().startingtime,
      'Endingtime':doc.data().nndingtime,
    'Reason':doc.data(). reason   } 
    });*/
    //this.afs.collection("new_booking_requests").doc(data.payload.doc.id).delete();
  //this.afs.collection("rejected_bookings").add(data).then(function(docRef) {
    //console.log("Document written with ID: ", docRef.id);
    
//});
}

reject(order){
  var doc=this.afs.collection("new_booking_requests").doc(order.payload.doc.id);
  this.afs.collection("new_booking_requests").doc(order.payload.doc.id).update({rejected:true });
  this.afs.collection("new_booking_requests").doc(order.payload.doc.id).update({confirmed:false });
  doc.get().subscribe(function(doc){
    console.log(doc.data());
  });
  //get().subscribe(res=>{doc=>{
    //ar data =doc.data()
      /*'SelectDate':doc.data().selectDate,
      'Startingtime':doc.data().startingtime,
      'Endingtime':doc.data().nndingtime,
    'Reason':doc.data(). reason   } 
    });*/
    //this.afs.collection("confirmed_bookings").doc(data.payload.doc.id).delete();
  //this.afs.collection("rejected_bookings").add(data).then(function(docRef) {
    //console.log("Document written with ID: ", docRef.id);
    
//});
}
confirm2(order){
  
  var doc=this.afs.collection("new_booking_requests").doc(order.payload.doc.id);
  this.afs.collection("new_booking_requests").doc(order.payload.doc.id).update({confirmed:true});
  this.afs.collection("new_booking_requests").doc(order.payload.doc.id).update({rejected:false });
  const dat= doc.get().subscribe(function(doc){doc.data();
    console.log(doc.data());
    
  });
  
    //var data =doc.data()
      /*'SelectDate':doc.data().selectDate,
      'Startingtime':doc.data().startingtime,
      'Endingtime':doc.data().endingtime,
    'Reason':doc.data(). reason   } 
    });*/
    //this.afs.collection("rejected_bookings").doc(data.payload.doc.id).delete();
  //this.afs.collection("confirmed_bookings").add(dat).then(function(docRef) {
    //console.log("Document written with ID: ", docRef.id);
    
//});
}

}