import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Habitacion, Precio } from '../shared/userinterface';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.page.html',
  styleUrls: ['./edit-price.page.scss'],
})
export class EditPricePage implements OnInit {

  precio: Precio;

  newPrecio: Precio = {
    id: '',
    habitacion: '',
    date: null,
    precio: null,
    fecha: '',
  }

  private path = 'Precio/';

  private id: string;

  habitaciones: Habitacion[] = [];
  constructor(public alerta: AlertController, private activateRoute: ActivatedRoute,private router:Router, public database: FirestoreService) { }

  ngOnInit() {
    this.id =this.activateRoute.snapshot.paramMap.get('id');
    this.database.getDoc<Precio>(this.path, this.id).subscribe(res => {
      console.log(res)
      this.newPrecio = res
    });
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
          }
        }
      ]
    });
    (await alert).present();
  }

  editarPrecio(){
    this.database.updateDoc(this.newPrecio, this.path, this.newPrecio.id)
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
