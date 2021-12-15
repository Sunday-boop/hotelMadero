import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Habitacion, Reserva } from '../shared/userinterface';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.page.html',
  styleUrls: ['./edit-reservation.page.scss'],
})
export class EditReservationPage implements OnInit {
  newReserva: Reserva = {
    checkIn: '',
    checkInInt: null,
    checkOut: '',
    checkOutInt: null,
    correoCliente: '',
    estado: '',
    fechaRealizacion: '',
    habitacion: null,
    idReserva: '',
    idUsuario: '',
    monto: null,
    nombreCliente: '',
    numeroTarjeta: null,
    telefonoCliente: null,
    titularTarjeta: '',
  }

  private path = 'Reserva/';

  private id: string;

  constructor(public alerta: AlertController, 
    private activateRoute: ActivatedRoute,
    private router:Router,
    public database: FirestoreService) { }

  ngOnInit() {
    this.id =this.activateRoute.snapshot.paramMap.get('id');
    this.database.getDoc<Reserva>(this.path, this.id).subscribe(res => {
      this.newReserva = res
    });
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
            this.router.navigate(['admin'])
          }
        }
      ]
    });
    (await alert).present();
  }

  editarReserva(){
    this.database.updateDoc(this.newReserva, this.path, this.newReserva.idReserva)
    this.router.navigate(['admin'])
  }
}
