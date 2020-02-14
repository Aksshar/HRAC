import { UserManagementService } from './../user-management.service';
import { UserModel } from './userModel';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { map, take, debounceTime} from 'rxjs/Operators';
import { ManageUserService } from '../manage-user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  
  submitted: boolean;
  showSuccessMessage: boolean;

  IndexForm: FormGroup;
  
  constructor(private afs: AngularFirestore, private fb: FormBuilder,private manageuser: ManageUserService, private router: Router, private toastr: ToastrService,private service: UserManagementService){}

  
  ngOnInit() {
    this.IndexForm = this.fb.group({
      IndexNumber:  ['', [
        Validators.required
      ],CustomIndexValidator.IndexNumber(this.afs)],
      RFIDNumber:  ['', [
        Validators.required,
      ], CustomRFIDValidator.RFIDNumber(this.afs)],
      stream: ['', [Validators.required]],
      academicYear: ['', Validators.required],
    });
    this.getUsers();
  }


  //get data from database to form
  updateuser(data){
  var da=data.payload.doc.data()
  this.IndexForm = this.fb.group({
    IndexNumber:  [da.IndexNumber,[
      Validators.required
    ],CustomIndexValidator.IndexNumber(this.afs)],
    RFIDNumber:  [da.RFIDNumber, [
      Validators.required,
    ], CustomRFIDValidator.RFIDNumber(this.afs) ],
    stream: [da.stream, [Validators.required]],
    academicYear: [da.academicYear, Validators.required],
  });
  return this.afs
  .collection("studentIndex")
  .doc(data.payload.doc.id)
  .delete();
}
  list;

  getUsers = () =>
    this.manageuser
      .getUsers()
      .subscribe(res => (this.list = res));
 
  deleteUser = data => this.manageuser.deleteUser(data);



  get IndexNumber() {
    return this.IndexForm.get('IndexNumber')
  }

  get RFIDNumber() {
    return this.IndexForm.get('RFIDNumber')
  }

  get stream() {
    return this.IndexForm.get('stream')
  }

  get academicYear() {
    return this.IndexForm.get('RFIDNumber')
  }

  onSubmit() {
    let data = this.IndexForm.value;
    if (this.IndexForm.valid) {
      this.IndexForm.reset();
      //Save to frebase
      //this.afs.collection('studentIndex').add(data)
      this.manageuser.insertIndex(data)
      .then(res => {
        this.toastr.success('Student Index inserted successfully!');
      });
    }


    
  }
/*
    //edit function
  onEdit(data: UserModel) {
    //get values to form
    this.IndexForm.setValue(UserModel);
    this.service.formData = Object.assign({}, data);
  }*/

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.afs.doc('studentIndex/' + id).delete();
      this.toastr.warning('Deleted successfully','EMP. Register');
    }
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
      map(arr => arr.length ? { IndexNumberAvailable: false } : null ),
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
      map(arr => arr.length ? { RFIDNumberAvailable: false } : null ),
    )

    }
  }
  

}
