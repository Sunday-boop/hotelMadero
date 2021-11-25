import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { Usuario } from '../shared/userinterface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.page.html',
  styleUrls: ['./add-users.page.scss'],
})
export class AddUsersPage implements OnInit {

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
            this.router.navigate(['users'])
            console.log('Buy clicked');
          }
        }
      ]
    });
    (await alert).present();
  }

  async guardarUsuario(){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.newUser.correo, this.newUser.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
       this.sendverificationEmail();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
     

    // this.newUser.password = user.uid;
    const id = this.database.getId();
    this.database.creatDoc(this.newUser, this.path, id)
    this.router.navigate(['users'])
  }

  async sendverificationEmail():Promise<void>{
    try{
      return (await this.afAuth.currentUser).sendEmailVerification()
    }catch(error){
      console.log('Error ->', error)
    }
  }
}
