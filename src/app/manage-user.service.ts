import { Injectable } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private afs: AngularFirestore) { }

  insertIndex(data){
    return this.afs.collection("studentIndex").add(data).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
  }


  updateUser(data) {
    return this.afs
      .collection("accessIndex")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }


  deleteUser(data) {
    return this.afs
      .collection("studentIndex")
      .doc(data.payload.doc.id)
      .delete();
  }

  getUsers() {
    return this.afs.collection("studentIndex").snapshotChanges();
  }
  
}
