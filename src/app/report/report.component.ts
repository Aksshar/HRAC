import { AngularFirestore } from '@angular/fire/firestore';
import { ReportService } from './../sharedServices/report.service';
import { Component, OnInit } from '@angular/core';
import { groupBy } from 'rxjs/Operators';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  data: any;

  subject;
  constructor(private excelService: ReportService, private afs: AngularFirestore) { }
  
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'Attendance_report');
 }

  ngOnInit() {
    this.afs.collection('subjectCode').valueChanges().subscribe(ref => {
      this.subject = ref;
    });
  }

  getattendance(code) {
    this.afs.collection(code, ref => ref.orderBy('indexNumber')).valueChanges().subscribe(ref => {
      this.data = ref;
      this.exportAsXLSX();
    });
      
  }

}
