import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { BookingDate } from './booking-data';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
  
  
export class CalenderComponent implements OnInit {
  public dataList: Array<BookingDate> = [];
  list;
  public selectedDate: Date = new Date();
  public currentView: View = 'Day';
  public readonly: boolean = true;
  public eventSettings: EventSettingsModel;
  //public eventSettings: EventSettingsModel = { dataSource: this.dataManger };
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    
    this.db.collection('booking').valueChanges().subscribe(ref => {
      this.list = ref;
      console.log(this.list);
      for (let i of this.list) {
        let temp = new BookingDate();
        console.log(new Date(i.stime));
        temp.StartTime = new Date(i.stime);
        console.log(temp);
        temp.EndTime = new Date(i.etime);
        this.dataList.push(temp);
      }
      this.eventSettings = { dataSource: this.dataList};
    });
    
  }
}






