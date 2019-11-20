import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAttendanceService {
  constructor(private db: AngularFirestore) {
  }
  

  getIndex(email) {
    
    
  }
}
