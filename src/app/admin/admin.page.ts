import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';

export interface Data {
  reservas: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  encapsulation: ViewEncapsulation.None
}) 
export class AdminPage{

  eventSource;
    viewTitle;

    isToday:boolean;
    calendar = {
        mode: 'month' as CalendarMode,
        step: 30 as Step,
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };

//---------------------------------------------------------------
  public data: Data;
  public columns: any;
  public rows: any;

  constructor(private router:Router, private authSvc:AuthService, private menucontroler: MenuController, private http: HttpClient,  private navController:NavController) { 
    this.loadEvents()
    this.columns = [
      { name: 'ID' },
      { name: 'FECHA' },
      { name: 'CLIENTE' },
      { name: 'HABITACIONES' },
      { name: 'EMPLEADO' },
      { name: 'TOTAL' },
      { name: 'VER MAS', prop: 'Id'}
    ];

    this.http.get<Data>('../../assets/reservas.json')
      .subscribe((res) => {
        console.log(res)
        
        this.rows = res.reservas;
       
      });

  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['home']);
    } catch (error) {
      console.log("Error=>",error)
    }
  }

  openMenu(){
    this.menucontroler.enable(true, 'main-menu');
    this.menucontroler.open('main-menu');
    this.menucontroler.enable(false, 'client-menu')
    // this.menucontroler.toggle('main-menu')
  }

///----------------------------------------------

loadEvents() {
  this.eventSource = this.createRandomEvents();
}

onViewTitleChanged(title) {
  this.viewTitle = title;
}

onEventSelected(event) {
  console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
}

changeMode(mode) {
  this.calendar.mode = mode;
}

today() {
  this.calendar.currentDate = new Date();
}

onTimeSelected(ev) {
  console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
}

onCurrentDateChanged(event:Date) {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  event.setHours(0, 0, 0, 0);
  this.isToday = today.getTime() === event.getTime();
}

createRandomEvents() {
  var events = [];
  for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
          startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
          if (endDay === startDay) {
              endDay += 1;
          }
          endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
          events.push({
              title: 'All Day - ' + i,
              startTime: startTime,
              endTime: endTime,
              allDay: true
          });
      } else {
          var startMinute = Math.floor(Math.random() * 24 * 60);
          var endMinute = Math.floor(Math.random() * 180) + startMinute;
          startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
          endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
          events.push({
              title: 'Reserva - ' + i,
              startTime: startTime,
              endTime: endTime,
              allDay: false
          });
      }
  }
  return events;
}

onRangeChanged(ev) {
  console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
}

markDisabled = (date:Date) => {
  var current = new Date();
  current.setHours(0, 0, 0);
  return date < current;
};

}
