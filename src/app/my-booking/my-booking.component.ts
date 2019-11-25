import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  showDeleteMessage:boolean;

  constructor() { }

  ngOnInit() {
  }

  onDelete(){
    if(confirm("Are you sure to delete this reord?")){
      this.showDeleteMessage=true;
    }
  }

}
