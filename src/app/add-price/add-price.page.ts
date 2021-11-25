import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Precio } from '../shared/userinterface';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.page.html',
  styleUrls: ['./add-price.page.scss'],
})
export class AddPricePage implements OnInit {

  newPrecio: Precio ={
    id: this.database.getId(),
    habitacion: '',
    fecha: null,
    precio: null,
  }

  private path = 'Precio/'

  constructor(public alerta: AlertController, public afAuth:AngularFireAuth, private router:Router, public database: FirestoreService) { }

  ngOnInit() {
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
    this.database.creatDoc(this.newPrecio, this.path, this.newPrecio.id)
    this.router.navigate(['price-bedrooms'])
  }

}
