import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ManageHallsService {

  constructor(private afs: AngularFirestore) { }

  InsertHalls(data){
   return this.afs.collection("Halls").add(data).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
  }
}
