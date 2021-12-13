import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Habitacion } from '../shared/userinterface';

@Component({
  selector: 'app-edit-bedrooms',
  templateUrl: './edit-bedrooms.page.html',
  styleUrls: ['./edit-bedrooms.page.scss'],
})
export class EditBedroomsPage implements OnInit {

  habitacion: Habitacion;

  newHabitacion: Habitacion = {
    id: '',
    numero: null,
    edificio: '',
    piso: '',
    capacidadA: null,
    capacidadM: null,
    tipo: '',
    numeroCama: null,
    tipoCama: '',
    descripcion: '',
  }

  private path = 'Habitacion/';

  private id: string;

  constructor(public alerta: AlertController, 
    private activateRoute: ActivatedRoute,
    private router:Router,
    public database: FirestoreService) { 

    }

  ngOnInit() {
    this.id =this.activateRoute.snapshot.paramMap.get('id');
    this.database.getDoc<Habitacion>(this.path, this.id).subscribe(res => {
      console.log(res)
      this.newHabitacion = res
    });
    // this.infoHabitacion
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
          }
        }
      ]
    });
    (await alert).present();
  }

  editarHabitacion(){
    this.database.updateDoc(this.newHabitacion, this.path, this.newHabitacion.id)
    this.router.navigate(['bedrooms'])
  }
}
