import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.css']
})
export class ViewTimetableComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }
  timetable = [];
  ngOnInit() {
    this.afs.collection('confirmed_bookings')
    .snapshotChanges().subscribe(serverItems => {
      this.timetable = [];
      serverItems.forEach(a => {
        let item:any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.timetable.push(item);
      });
    });
  }

  delete(item) {
    this.afs.collection('confirmed_bookings').doc(item.id).delete();
  }

}
