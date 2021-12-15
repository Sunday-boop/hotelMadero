import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Nota } from '../shared/userinterface';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.page.html',
  styleUrls: ['./edit-notes.page.scss'],
})
export class EditNotesPage implements OnInit {

  newNota: Nota = {
    id: '',
    checkIn: '',
    checkOut: '',
    habitacion: null,
    nota: '',
  }

  private path = 'Nota/';
  private id: string;

  constructor(public alerta: AlertController, 
    private activateRoute: ActivatedRoute,
    private router:Router,
    public database: FirestoreService) { }

  ngOnInit() {
    this.id =this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.id)
    this.database.getDoc<Nota>(this.path, this.id).subscribe(res => {
      console.log(res)
      this.newNota = res
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
            this.router.navigate(['notes'])
          }
        }
      ]
    });
    (await alert).present();
  }

  editarNota(){
    this.database.updateDoc(this.newNota, this.path, this.newNota.id)
    this.router.navigate(['notes'])
  }
}
