import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({ 
  providedIn: 'root'
})
export class ManageAccessService {

  constructor(private afs: AngularFirestore) { }

  insert(data){
    return this.afs.collection("accessIndex").add(data).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
  }


   deleteUser(data) {
    return this.afs
      .collection("accessIndex")
      .doc(data.payload.doc.id)
      .delete();
  }

  updateUser(data){
    return this.afs
    .collection("accessIndex")
    .doc(data.payload.doc.id)
    .update(data);
    // .update({
    //  HallNumber: hallnumber
    // });

    // return this.afs.collection("accessIndex").update(data).then(function(docRef) {
    //   console.log("Document written with ID: ", docRef.id);
    // }
    // return this.afs
    // .collection("accessIndex")
    // .doc(data.payload.doc.id)
    // .update(data);
    //.set({},{merge: true});  
  }  

  getUsers() {
    return this.afs.collection("accessIndex").snapshotChanges();
  }

}
