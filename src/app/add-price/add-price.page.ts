import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Habitacion, Precio } from '../shared/userinterface';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.page.html',
  styleUrls: ['./add-price.page.scss'],
})
export class AddPricePage implements OnInit {

  newPrecio: Precio ={
    id: this.database.getId(),
    habitacion: '',
    date: null,
    precio: null,
    fecha: '',
  }

  private path = 'Precio/'

  habitaciones: Habitacion[] = [];
  constructor(public alerta: AlertController, private datepipe: DatePipe, public afAuth:AngularFireAuth, private router:Router, public database: FirestoreService) {
    
  }

  ngOnInit() {
    this.getHabitaciones()
  }

  async alertaRegresar(){
    let alert = this.alerta.create({
      header: 'Titulo de la alerta',
      message: 'Estas seguro que deseas regresar? Se perderan los datos',
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
            this.router.navigate(['price-bedrooms'])
            console.log('Buy clicked');
          }
        }
      ]
    });
    (await alert).present();
  }

  async guardarPrecio(){
    var fullDate = new Date(this.newPrecio.date); 
    console.log(fullDate);
    var twoDigitMonth = fullDate.getMonth() + "";
    if (twoDigitMonth.length == 1)
      twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1)
      twoDigitDate = "0" + twoDigitDate;
    var currentDate = fullDate.getFullYear() + "" + (parseInt(twoDigitMonth) + 1) + "" + parseInt(twoDigitDate); console.log("fgf" + parseInt(currentDate));
    console.log('alo policia2 '+fullDate)
    this.newPrecio.date = parseInt(currentDate);
    // console.log('alo policia2 '+currentDate)
    this.newPrecio.fecha = this.datepipe.transform(fullDate, 'yyyy-MM-dd');
    this.database.creatDoc(this.newPrecio, this.path, this.newPrecio.id)
    this.router.navigate(['price-bedrooms'])
  }

  getHabitaciones(){
    const path = 'Habitacion/'
    this.database.getCollection<Habitacion>(path).subscribe(res => {
      this.habitaciones = res
      console.log(this.habitaciones)
    });
  }

}
