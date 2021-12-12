import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Data, Router } from '@angular/router';
import { Precio } from '../shared/userinterface';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NavController } from '@ionic/angular';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';


@Component({
  selector: 'app-price-bedrooms',
  templateUrl: './price-bedrooms.page.html',
  styleUrls: ['./price-bedrooms.page.scss'],
})
export class PriceBedroomsPage implements OnInit {

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
  public preciosCal: Precio[] = [];
  precios: Precio[] = [];
  private path = 'Precio/';
  private id: Number;
  textoConsultar = ''; 

  constructor(private http: HttpClient, public alerta: AlertController, private router: Router, public database: FirestoreService, private menucontroler: MenuController, private navController:NavController) { 
    this.columns = [
      { name: 'id' },
      { name: 'habitacion' },
      { name: 'fecha' },
      { name: 'precio' },
    ];

    var fullDate = new Date(); console.log(fullDate);
    var twoDigitMonth = fullDate.getMonth() + "";
    if (twoDigitMonth.length == 1)
      twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1)
      twoDigitDate = "0" + twoDigitDate;
    var currentDate = fullDate.getFullYear() + "" + (parseInt(twoDigitMonth) + 1) + "" + parseInt(twoDigitDate); console.log("fgf" + parseInt(currentDate));

    this.database.getCollectionOrdenada<Precio>(this.path, 'fecha', 'date', parseInt(currentDate)).subscribe(res => {
      this.precios = res;
      
      this.rows = this.precios
     
    });

  }

  ngOnInit() {
   
     this.loadEvents();
   
  }

  async alertaEliminar(){
    let alert = this.alerta.create({
      header: 'Advertencia',
      message: 'Estas seguro que deseas elminar este precio?',
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
            this.deletePrecio(this.id)
            this.router.navigate(['price-bedrooms'])
          }
        }
      ]
    });
    (await alert).present();
  }

  

  deletePrecio(id){
    console.log('awebo ya podemos hacer el de eliminar '+ this.id)
    this.database.deleteDoc(this.path, id)
  }

  async alertaEditar(){
    let alert = this.alerta.create({
      header: 'Advertencia',
      message: '¿Deseas editar este precio?',
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
            this.router.navigate(['price-bedrooms/'+this.id])
          }
        }
      ]
    });
    (await alert).present();
  }

  editarHabitacion(){
    console.log('recibo el id '+this.id)
    // this.router.navigate(['price-bedrooms/'+this.id])
  }

  openMenu(){
    this.menucontroler.toggle('main-menu')
  }

  onActivate(event) {
    if (event.type == 'click') {
       this.id = event.row.id
       console.log(this.id)
    }
  }

 

  consultar(event){
    const path = 'Precio/';
    this.textoConsultar = event.detail.value;

    this.database.getCollectionConsulta<Precio>(path, 'habitacion', this.textoConsultar).subscribe( res =>{
      console.log(res+ "fffffff");
      this.precios = res;
     
      this.rows = this.precios;
    
        
    });

    if(this.textoConsultar == ''){
      this.database.getCollection<Precio>(this.path).subscribe(res => {
        this.precios = res;
        this.rows = this.precios
        
      });
    }
   
  }

///----------------------------------------------

loadEvents() {
 var g =  this.database.getCollection<Precio>(this.path).subscribe(res => {
    // items.map(item =>{
 
      this.preciosCal=res
      for(var i = 0; i < this.preciosCal.length; i += 1){
        console.log("wwopopop "+this.preciosCal[i].precio);
          }
      
      this.eventSource = this.createRandomEvents();
    // }
    // );
        
  });
for(var i = 0; i < this.preciosCal.length; i += 1){
      console.log("ww "+this.preciosCal[i]);
        }
  
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
 
 

  for(var i = 0; i <this.preciosCal.length ; i += 1){
    console.log("wwxx "+this.preciosCal[i].habitacion);
      }


  for (var i = 0; i <this.preciosCal.length; i += 1) {
      var date = new Date();
      var eventType = 0;
      var startDay = 0;
      var endDay = 1+ startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
          startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
          
          if (endDay === startDay) {
              endDay += 1;
          }
          endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));

          events.push({
              title: 'Habitacion : ' + this.preciosCal[i].habitacion +'  Precio: $'+ this.preciosCal[i].precio,
              startTime: startTime,
              endTime: endTime,
              allDay: true
          });
      } else {
        //gnera la hora del evento
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
