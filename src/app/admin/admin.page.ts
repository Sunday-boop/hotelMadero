import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { Reserva } from '../shared/userinterface';
import { FirestoreService } from '../services/firestore.service';

export interface Data {
  reservas: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPage {

  eventSource;
  viewTitle;

  isToday: boolean;
  calendar = {
    mode: 'month' as CalendarMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      }
    }
  };

  //---------------------------------------------------------------
  public data: Data;
  public columns: any;
  public rows: any;

  public reservasCal: Reserva[] = [];
  public reservasCal2: Reserva[] = [];
  public reservasCal3: Reserva[] = [];
  //contiene las habitaciones las cuales tienen reserva  8, 5, 9
  public habitacionesreserva: number[] = [];
// contiene todos los dias de todas las reservas  si son dos reservas del del 12 al 14 serian 3 fechas que se almacenaron
  public DiasDeHabitaciones: number[] = [];
  //para saber cuantos dias son entre checkin y checkout
  public Repetisiones: number[] = [];
  reservas: Reserva[] = [];
  private path = 'Reserva/';
  private id: Number;

  constructor(private router: Router, public alerta: AlertController, private authSvc: AuthService, private menucontroler: MenuController, public database: FirestoreService, private http: HttpClient, private navController: NavController) {

    this.columns = [
      { name: 'checkIn' },
      { name: 'checkOut' },
      { name: 'correoCliente' },
      { name: 'estado' },
      { name: 'fechaRealizacion' },
      { name: 'idReserva' },
      { name: 'idUsuario' },
      { name: 'monto' },
      { name: 'nombreCliente' },
      { name: 'numeroTarjeta' },
      { name: 'telefonoCliente' },
      { name: 'titularTarjeta' },
    ];

    this.database.getCollection<Reserva>(this.path).subscribe(res => {
      this.reservas = res;
      this.rows = this.reservas;
    });

    var fullDate = new Date(); console.log(fullDate);
    var twoDigitMonth = fullDate.getMonth() + "";
    if (twoDigitMonth.length == 1)
      twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1)
      twoDigitDate = "0" + twoDigitDate;
    var currentDate = fullDate.getFullYear() + "" + (parseInt(twoDigitMonth) + 1) + "" + parseInt(twoDigitDate);
    this.database.getCollectionOrdenada<Reserva>(this.path, 'fecha', 'checkInInt',  parseInt(currentDate)).subscribe(res => {
      this.reservasCal3 = res;
     
  
    });

    this.loadEvents();
  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['home']);
    } catch (error) {
      console.log("Error=>", error)
    }
  }

  openMenu() {
    this.menucontroler.enable(true, 'main-menu');
    this.menucontroler.open('main-menu');
    this.menucontroler.enable(false, 'client-menu')
    // this.menucontroler.toggle('main-menu')
  }

  ///----------------------------------------------

  loadEvents() {
    var fullDate = new Date(); console.log(fullDate);
    var twoDigitMonth = fullDate.getMonth() + "";
    if (twoDigitMonth.length == 1)
      twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1)
      twoDigitDate = "0" + twoDigitDate;
    var currentDate = fullDate.getFullYear() + "" + (parseInt(twoDigitMonth) + 1) + "" + parseInt(twoDigitDate);

    this.database.getCollectionOrdenada<Reserva>(this.path, 'fecha', 'checkInInt', parseInt(currentDate)).subscribe(res => {
      this.reservasCal = res;
      this.reservasCal2 = res;

console.log("Nue"+  this.reservasCal.length)

for (let irr = 0; irr < this.reservasCal2.length; irr++) {
        console.log("---"+this.reservasCal2[irr].checkInInt+"-- " +this.reservasCal2[irr].checkOutInt+"ff"+this.reservasCal2[irr].habitacion)
      }


      for (let i = 0; i < this.reservasCal.length; i++) {
 var contador =0;
for ( this.reservasCal[i].checkInInt; this.reservasCal[i].checkInInt <= this.reservasCal[i].checkOutInt; this.reservasCal[i].checkInInt++) {
  contador++;
   var y = this.reservasCal[i].checkInInt;
        this.DiasDeHabitaciones.push(y);
       this.Repetisiones[i]=contador;
      }

        this.habitacionesreserva[i] = this.reservasCal[i].habitacion;
      }
      
      for(let i = 0; i < this.Repetisiones.length; i++){
 console.log("rwrwrw"+this.Repetisiones[i])
      }
      var c = parseInt(currentDate);
      console.log("NUMERO XDXDX"+ this.DiasDeHabitaciones.length)
      this.eventSource = this.createRandomEvents(c);
    });
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

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents(c) {

    var indice2=c;
       var events = [];
       var startDay = 0; 
       for (var i = 0; i < this.Repetisiones.length; i += 1) {
         var date = new Date();
         var eventType = 0;
   
         console.log("ñlñlñlñl"+this.reservasCal3[i].checkInInt)
         startDay=(this.reservasCal3[i].checkInInt)-c;
         var endDay = this.Repetisiones[i]+startDay;
         var startTime;
         var endTime;
         if (eventType === 0) {
           startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
           if (endDay === startDay) {
             endDay += 1;
           }
           endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
           events.push({
             title: 'Habitacion : ' +  this.habitacionesreserva[i]+ '  Reserva del ' + this.reservasCal2[i].checkIn+' Hasta '+ ' '+ this.reservasCal2[i].checkOut,
             startTime: startTime,
             endTime: endTime,
             allDay: true
           });
         } 
   
   
       }
   
       return events;
     }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  onActivate(event) {
    if (event.type == 'click') {
      this.id = event.row.idReserva
      console.log(this.id)
    }
  }

  async alertaEditar() {
    let alert = this.alerta.create({
      header: 'Advertencia',
      message: 'Deseas editar esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            // this.deleteHabitacion(this.id)
            this.router.navigate(['reservation/' + this.id])
          }
        }
      ]
    });
    (await alert).present();
  }

  async alertaEliminar(){
    let alert = this.alerta.create({
      header: 'Advertencia',
      message: 'Estas seguro que deseas elminar esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteReserva(this.id)
            this.router.navigate(['admin'])
          }
        }
      ]
    });
    (await alert).present();
  }

  deleteReserva(id){
    this.database.deleteDoc(this.path, id)
    this.database.deleteDoc('Nota', id)
  }

}
