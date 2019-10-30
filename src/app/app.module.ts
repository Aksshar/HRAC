import { environment } from './../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { RouterModule,Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HallComponent } from './hall/hall.component';

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
    HallComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path: '',component: HomeComponent},
      { path: 'Home', component: HomeComponent },
      { path: 'SignIn', component: SigninComponent },
      { path: 'Hall', component: HallComponent },
      { path: 'SignUp', component: SignUpComponent },
      { path: 'Attendance', component: AttendanceComponent },
      { path: 'Dashboard', component: DashboardComponent}
    ]),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
