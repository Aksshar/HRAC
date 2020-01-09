import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecture-hall',
  templateUrl: './lecture-hall.component.html',
  styleUrls: ['./lecture-hall.component.css']
})
export class LectureHallComponent implements OnInit {

  ListOfhalls;
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('Halls').valueChanges().subscribe(val => {
      this.ListOfhalls = val;
    })
  }

}
