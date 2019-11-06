import { map } from 'rxjs/Operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Dates } from './currentsemester/dates';
@Injectable({
  providedIn: 'root'
})
export class DateService {
  dates: Observable<Dates[]>;
  constructor(private db:AngularFirestore) {
  }

  getUsers() {
    this.dates = this.db.collection('Dates').snapshotChanges().map(
      changes => {
      return changes.map(
      a => {
      const data = a.payload.doc.data() as Dates;
      data.id = a.payload.doc.id;
      return data;
      });
      });
  }
}
