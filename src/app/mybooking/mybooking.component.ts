import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.component.html',
  styleUrls: ['./mybooking.component.css']
})
export class MybookingComponent implements OnInit {

  constructor(private router: RouterModule) { }

  ngOnInit() {
  }

}
