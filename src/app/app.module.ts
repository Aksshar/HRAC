import { HttpClientModule, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ManageAccessService } from './manage-access.service';
import { UserManagementService } from './user-management.service';
import { UserAttendanceService } from './user-attendance.service';
import { DateService } from './date.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from './../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from 'angularfire2/database';
import { RouterModule,Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ManageUserService } from './manage-user.service';
import { ManageHallsService } from './manage-halls.service';
import { AuthService } from './auth.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ManageHallsComponent } from './manage-halls/manage-halls.component';
import { CurrentsemesterComponent } from './currentsemester/currentsemester.component';
import { ManageAccessComponent } from './manage-access/manage-access.component';
import { CalenderComponent } from './components/calender/calender.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, MonthService, WeekService } from '@syncfusion/ej2-angular-schedule';
import { HallReservationComponent } from './hall-reservation/hall-reservation.component';
import { MybookingComponent } from './mybooking/mybooking.component';
import { LectureHallComponent } from './lecture-hall/lecture-hall.component';
import { ReportComponent } from './report/report.component';
import { ViewTimetableComponent } from './view-timetable/view-timetable.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SigninComponent,
    HomeComponent,
    SignUpComponent,
    AttendanceComponent,
    DashboardComponent,
    ManageUsersComponent,
    ManageBookingComponent,
    DashboardAdminComponent,
    ManageHallsComponent,
    CurrentsemesterComponent,
    ManageAccessComponent,
    CalenderComponent,
    HallReservationComponent,
    MybookingComponent,
    LectureHallComponent,
    ReportComponent,
    ViewTimetableComponent
 
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path: '',component: HomeComponent},
      { path: 'Home', component: HomeComponent },
      { path: 'SignIn', component: SigninComponent },
      { path: 'SignUp', component: SignUpComponent },
      { path: 'Attendance', component: AttendanceComponent },
      { path: 'LectureHalls', component: LectureHallComponent },
      { path: 'HallReservation/:hallNumber/Mybooking', component: MybookingComponent },
      { path: 'HallReservation/:hallNumber', component: HallReservationComponent},
      {
        path: 'Dashboard', component: DashboardComponent,
        children: [
          { path: 'dashboard-admin', component: DashboardAdminComponent},
          { path: 'manage-users', component: ManageUsersComponent },
          { path: 'manage-booking', component: ManageBookingComponent },
          { path: 'manage-halls', component: ManageHallsComponent },
          { path: 'currentsemester', component: CurrentsemesterComponent },
          { path: 'manage-access', component: ManageAccessComponent },
          { path: 'report', component: ReportComponent },
          { path: 'timetable', component: ViewTimetableComponent}
          
        ]
      }
    ]),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 6000, positionClass: 'toast-top-center', preventDuplicates: false }),
    ScheduleModule, RecurrenceEditorModule,
  ],
  providers: [
    AngularFirestore,
    ManageUserService,
    ManageHallsService,
    AngularFireDatabase,
    AuthService,
    AngularFireAuth,
    DateService,
    UserAttendanceService,
    UserManagementService,
    ManageAccessService,
    DayService,
    WeekService,
    MonthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
