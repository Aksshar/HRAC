import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private db: AngularFirestore) { }
  save(index) {
      this.db.collection('studentIndex').add({
      index
      });
  }

  ngOnInit() {
  }

}
