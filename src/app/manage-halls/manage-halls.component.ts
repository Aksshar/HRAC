import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { map, take, debounceTime} from 'rxjs/Operators';
import { ToastrService } from 'ngx-toastr';
import { ManageHallsService } from '../manage-halls.service';

@Component({
  selector: 'app-manage-halls',
  templateUrl: './manage-halls.component.html',
  styleUrls: ['./manage-halls.component.css']
})
export class ManageHallsComponent implements OnInit {
  isAvailable: boolean=true;

  HallsForm: FormGroup;
  constructor(private afs: AngularFirestore, private fb: FormBuilder, private toastr: ToastrService, private managehalls: ManageHallsService){}
   
   
    ngOnInit() {
    this.HallsForm = this.fb.group({
      HallNumber:  ['', [
        Validators.required
      ],CustomHallValidator.HallNumber(this.afs)],
      Capacity:  ['', [
        Validators.required,
      ],],
    });
    this.getHalls();
  }

  list;

  getHalls = () =>
    this.managehalls
      .getHalls()
      .subscribe(res => (this.list = res));

  deleteHalls = data => this.managehalls.deleteHalls(data);
  updateHalls = data => this.managehalls.updateHalls(data);
 
  isAvailableHalls(order){
    this.afs.collection("Halls").doc(order.payload.doc.id).update({isAvailable:false});
    this.isAvailable=!this.isAvailable;

  } 

  get HallNumber() {
    return this.HallsForm.get('HallNumber')
  }

  get Capacity() {
    return this.HallsForm.get('Capacity')
  }

 onSubmit(){
    let data = this.HallsForm.value;
    this.HallsForm.reset();
    this.managehalls.InsertHalls(data).then(res => {
      this.toastr.success('Hall inserted successfully!');
    });
  }

}

export class CustomHallValidator {
  static HallNumber(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      
    const HallNumber = control.value;
  
    return afs.collection('Halls', ref => ref.where('HallNumber', '==', HallNumber) )        
    .valueChanges().pipe(
      debounceTime(500),
      take(1),
      map(arr => arr.length ? { HallNumberAvailable: false } : null ),
    )

    }
  }
}
