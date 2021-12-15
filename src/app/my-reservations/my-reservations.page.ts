import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Reserva, Usuario } from '../shared/userinterface';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.page.html',
  styleUrls: ['./my-reservations.page.scss'],
})
export class MyReservationsPage implements OnInit {

  nombre: string;
  id: string;
  reservas: Reserva [] = [];

  constructor(private router:Router,
    private authSvc:AuthService,
    private menucontroler: MenuController,
    public database: FirestoreService,) { }

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      var email = user.email;
      console.log(email)
    }

    this.database.getCollectionConsulta<Usuario>('Usuario/', 'correo', email).subscribe(res => {
      console.log(res[0].id)
      this.id = res[0].id
      this.nombre = res[0].nombre+' '+res[0].apellidoP

      this.database.getCollectionConsulta<Reserva>('Reserva', 'idUsuario', this.id).subscribe(res => {
        this.reservas = res
      });
    });

    
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['home']);
    } catch (error) {
      console.log("Error=>",error)
    }
  }

  openMenu(){
    this.menucontroler.toggle('client-menu')
  }
}
