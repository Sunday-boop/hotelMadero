import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Usuario } from '../shared/userinterface';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  newUser: Usuario ={
    nombre: '',
    apellidoP: null,
    apellidoM: '',
    correo: '',
    password: '',
    telefono: null,
    fechaNac: null,
    tipoU: '',
  }

  private path = 'Usuario/'
  
  constructor(public alerta: AlertController, public database: FirestoreService, private authSvc:AuthService, private router:Router) { }

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
            this.router.navigate(['users'])
            console.log('Buy clicked');
          }
        }
      ]
    });
    (await alert).present();
  }

  async onRegister(email, password){
    try {
      const user = await this.authSvc.register(email.value, password.value);
      this.newUser.password = user.uid;
      this.newUser.tipoU = 'Cliente';
      const id = this.database.getId();
      this.database.creatDoc(this.newUser, this.path, id)
      this.router.navigate(['users'])
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }  
    } catch (error) {
      console.log('Error', error)
    }
  }

  private redirectUser(isVerified:boolean): void{
    if (isVerified) {
      this.router.navigate(['admin'])
    }else{
      this.router.navigate(['verify-email'])
    }
  }
}
