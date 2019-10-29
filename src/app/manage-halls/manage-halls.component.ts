import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-halls',
  templateUrl: './manage-halls.component.html',
  styleUrls: ['./manage-halls.component.css']
})
export class ManageHallsComponent implements OnInit {

    myGroupForm = new FormGroup({
    HallNumber: new FormControl('', Validators.required),
    Capacity: new FormControl('', Validators.required)
    });
  ngOnInit() {
   
    
  }
  get HallNumber() {
    return this.myGroupForm.get('HallNumber');
  }

  get Capacity() {
    return this.myGroupForm.get('Capacity');
  }

}
