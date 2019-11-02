import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'; 

@Component({
  selector: 'app-currentsemester',
  templateUrl: './currentsemester.component.html',
  styleUrls: ['./currentsemester.component.css']
})
export class CurrentsemesterComponent implements OnInit {
  RFID:any;
  constructor(private db:AngularFirestore) { }

  ngOnInit() {
    this.db.collection('RFID_NO').valueChanges().subscribe(val => {
      console.log(val);
      this.RFID = val;
    })
  }

}
