import { AngularFirestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit {

  constructor(private router: RouterModule,private afs: AngularFirestore) { }
  items = [];
  ngOnInit() {
    this.afs.collection('new_booking_requests')
    .snapshotChanges().subscribe(serverItems => {
      this.items = [];
      serverItems.forEach(a => {
        let item:any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.items.push(item);
      });
    });
  }

  
  delete(item) {
    this.afs.collection('confirmed_bookings').doc(item.id).delete();
  }

}
