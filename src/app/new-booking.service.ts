import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewBookingService {

  
  constructor(private afs: AngularFirestore) { }

  //get booking details
  getBooking()
  {
    return this.afs.collection('booking').snapshotChanges();
  }

}
