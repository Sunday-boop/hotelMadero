import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-add-bedrooms',
  templateUrl: './add-bedrooms.page.html',
  styleUrls: ['./add-bedrooms.page.scss'],
})
export class AddBedroomsPage implements OnInit {

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
            this.router.navigate(['bedrooms'])
            console.log('Buy clicked');
          }
        }
      ]
    });
    (await alert).present();
  }

}
