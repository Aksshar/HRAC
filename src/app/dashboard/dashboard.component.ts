import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  showusers() {
    this.router.navigate(['manage-users'], { relativeTo: this.route });
  }

  showbooking() {
    this.router.navigate(['manage-booking'], { relativeTo: this.route });
  }
  showdashboard() {
    this.router.navigate(['dashboard-admin'], { relativeTo: this.route });
  }

  ngOnInit() {
  }

}
