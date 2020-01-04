import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewBookingService } from '../new-booking.service';
import { Booking } from '../booking.model';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit{
  list:Booking[];
  constructor(private service:NewBookingService){}

  ngOnInit() {
   this.service.getBooking().subscribe(res=>{
     this.list= res.map(item =>{
       return{
         id: item.payload.doc.id,
         //...item.payload.doc.data()
        } as Booking
     })
   });
    
  }

}
