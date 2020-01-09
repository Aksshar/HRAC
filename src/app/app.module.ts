import { UserAttendanceService } from './user-attendance.service';
import { DateService } from './date.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from './../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
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
import { AddNewHallComponent } from './add-new-hall/add-new-hall.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { NewhallComponent } from './newhall/newhall.component';
import { HallsComponent } from './halls/halls.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { UploadComponent } from './upload/upload.component';
import { MassageComponent } from './massage/massage.component';
import { TestuploadComponent } from './testupload/testupload.component';
import { DropZoneDirective } from './drop-zone.directive';







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
    AddNewHallComponent,
    NewBookingComponent,
    NewhallComponent,
    HallsComponent,
    MyBookingComponent,
    UploadComponent,
    MassageComponent,
    TestuploadComponent,
    DropZoneDirective
 
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path: '',component: HomeComponent},
      { path: 'Home', component: HomeComponent },
      { path: 'SignIn', component: SigninComponent },
      { path: 'SignUp', component: SignUpComponent },
      { path: 'Attendance', component: AttendanceComponent },
      { path: 'Newhall', component: NewhallComponent },
      { path: 'Halls', component: HallsComponent },
      { path: 'Bookingform', component: NewBookingComponent },
      { path: 'Addnewhall', component: AddNewHallComponent },
      { path: 'Mybooking', component: MyBookingComponent },
      { path: 'Newbooking', component: NewBookingComponent },
      
      {
        path: 'Dashboard', component: DashboardComponent,
        children: [
          { path: 'dashboard-admin', component: DashboardAdminComponent},
          { path: 'manage-users', component: ManageUsersComponent },
          { path: 'manage-booking', component: ManageBookingComponent },
          { path: 'manage-halls', component: ManageHallsComponent },
          { path: 'currentsemester', component: CurrentsemesterComponent },
          
        ]
      }
    ]),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireStorageModule ,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 6000, positionClass: 'toast-top-center', preventDuplicates: false }),
  ],
  providers: [
    AngularFirestore,
    ManageUserService,
    ManageHallsService,
    AngularFireDatabase,
    AuthService,
    AngularFireAuth,
    DateService,
    UserAttendanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
