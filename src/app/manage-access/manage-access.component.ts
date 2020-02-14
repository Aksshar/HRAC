import { ManageAccessService } from './../manage-access.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, take, debounceTime} from 'rxjs/Operators';

@Component({
  selector: 'app-manage-access',
  templateUrl: './manage-access.component.html',
  styleUrls: ['./manage-access.component.css']
})
export class ManageAccessComponent implements OnInit {
  submitted: boolean;
  showSuccessMessage: boolean;

  AccessForm: FormGroup;

  constructor(private afs: AngularFirestore, private fb: FormBuilder, private toastr: ToastrService, private manageAccess: ManageAccessService) { }

  ngOnInit() {
    this.AccessForm = this.fb.group({
      IndexNumber:  ['', [
        Validators.required
      ],CustomIndexValidator.IndexNumber(this.afs)],
      RFIDNumber:  ['', [
        Validators.required,
      ], CustomRFIDValidator.RFIDNumber(this.afs)],
      HallNumber:  ['', [
        Validators.required,
      ], CustomHallValidator.HallNumber(this.afs)],
    });
    this.getUsers();
  }

  updateUser(data){
    // console.log(data.data())
    var da=data.payload.doc.data()
    this.AccessForm=this.fb.group({
      IndexNumber:  [da.IndexNumber, [
        Validators.required
      ],CustomIndexValidator.IndexNumber(this.afs)],
      RFIDNumber:  [da.RFIDNumber, [
        Validators.required,
      ], CustomRFIDValidator.RFIDNumber(this.afs)],
      HallNumber:  [da.HallNumber, [
        Validators.required,
      ], CustomHallValidator.HallNumber(this.afs),],
    });
    return this.afs
    .collection("accessIndex")
    .doc(data.payload.doc.id)
    .delete();
  }
  
  list;

  getUsers = () =>
    this.manageAccess
      .getUsers()
      .subscribe(res => (this.list = res));

  deleteUser = data => this.manageAccess.deleteUser(data);


//  updateUser =data => this.manageAccess.updateUser(data);

  get IndexNumber() {
    return this.AccessForm.get('IndexNumber')
  }

  get RFIDNumber() {
    return this.AccessForm.get('RFIDNumber')
  }

  get HallNumber() {
    return this.AccessForm.get('HallNumber')
  }

hall;
  onSubmit() {
    let val;
    let data = this.AccessForm.value;
     this.IndexHallValidator(this.AccessForm.value).subscribe(res => {if(res.length){this.hall = true;}val = res;});
     console.log(this.hall);
    if (this.AccessForm.valid && this.hall) {
      this.AccessForm.reset();
      this.manageAccess.insert(data).then(res => {
        this.toastr.success('Access Provided successfully!');
      //   this.manageAccess.updateUser( data).then(res=>{
      //     this.toastr.success('Updated successfully!');
      // });
      
      });
    }    
  }

  IndexHallValidator(data)
  {
    return this.afs.collection('accessIndex', ref => ref.where('RFIDNumber', '==', data.RFIDNumber ).where('HallNumber', '==', data.HallNumber))        
    .valueChanges();
  }

}

export class CustomIndexValidator {
  static IndexNumber(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      
    const IndexNumber = control.value;
  
    return afs.collection('studentIndex', ref => ref.where('IndexNumber', '==', IndexNumber) )        
    .valueChanges().pipe(
      debounceTime(500),
      take(1),
      map(arr => arr.length ? null : { IndexNumberAvailable: false } ),
    )

    }
  }
}

export class CustomRFIDValidator {
  static RFIDNumber(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      
    const RFIDNumber = control.value;
  
    return afs.collection('studentIndex', ref => ref.where('RFIDNumber', '==', RFIDNumber) )        
    .valueChanges().pipe(
      debounceTime(500),
      take(1),
      map(arr => arr.length ? null : { RFIDNumberAvailable: false } ),
    )

    }
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
      map(arr => arr.length ? null:{ HallNumberAvailable: false }  ),
    )

    }
  }
}



// export const IndexnHallValidator: ValidatorFn=(control:FormGroup):
// ValidationErrors | null =>{
//   const IndexNumber=control.get('IndexNumber');
//   const HallNumber=control.get('HallNumber');
//   return IndexNumber && HallNumber && IndexNumber.value === HallNumber.value ? {
//     'CustomIndexnHallValidator' : false} : null;
  
// };