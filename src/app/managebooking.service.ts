import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class ManagebookingService {

  constructor(private afs: AngularFirestore) { }

  
  insertIndex(data){
    return this.afs.collection("confirmed_bookings").add(data).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      
})}

  getRequest() {
    return this.afs.collection("new_booking_requests").snapshotChanges();
  }

  getReject() {
    return this.afs.collection("rejected_bookings").snapshotChanges();
  }

  getConfirm() {
    return this.afs.collection("confirmed_bookings").snapshotChanges();
  }

}
