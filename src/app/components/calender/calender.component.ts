import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  public selectedDate: Date = new Date();
  public currentView: View = 'Day';
  public readonly: boolean = true;
  //public eventSettings: EventSettingsModel = { dataSource: this.dataManger };
  constructor() { }

  ngOnInit() {
  }

}






