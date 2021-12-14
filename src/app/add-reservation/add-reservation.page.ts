import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Habitacion } from '../shared/userinterface';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.page.html',
  styleUrls: ['./add-reservation.page.scss'],
})
export class AddReservationPage implements OnInit {

  newHabitacion: Habitacion [] = [];

  private path = 'Habitacion/';
  private id: string;
  
  constructor(private router:Router, 
    private activateRoute: ActivatedRoute,
    private authSvc:AuthService, 
    public database: FirestoreService,
    private menucontroler: MenuController) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('habitacion');
    this.database.getCollectionConsulta<Habitacion>(this.path, 'numero', parseInt(this.id)).subscribe(res => {
      this.newHabitacion = res
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
