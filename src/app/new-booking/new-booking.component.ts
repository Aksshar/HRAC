import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { map, take, debounceTime} from 'rxjs/Operators';
import { ToastrService } from 'ngx-toastr';
import { NewBookingService } from '../new-booking.service';


@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {

  BookingForm: FormGroup;
  constructor(private afs: AngularFirestore, private fb:FormBuilder, private toastr: ToastrService, private service:NewBookingService ){}
   
   
    ngOnInit() {
    this.BookingForm = new FormGroup({
      name: new FormControl( ['', Validators.required]),
      lecture:  new FormControl(['', Validators.required]),
      code:  new FormControl(['', Validators.required]),
      session:  new FormControl(['', Validators.required]),
      Time: new FormControl( ['', Validators.required])
    });
  }

  onSubmit(){
    let data = this.BookingForm.value;
    
    this.afs.collection('newbooking').add(data).then(res => {
      this.toastr.success('Submitted successfully! Wait for comfimention');
    });
    this.BookingForm.reset();
  }

}