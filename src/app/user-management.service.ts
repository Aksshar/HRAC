import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { UserModel } from './manage-users/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  formData: UserModel;

  constructor(private firestore: AngularFirestore) { }

  getStudents() {
    return this.firestore.collection('studentIndex').snapshotChanges();
  }
}
