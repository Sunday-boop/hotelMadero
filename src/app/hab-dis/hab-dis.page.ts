import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Precio, Reserva } from '../shared/userinterface';

@Component({
  selector: 'app-hab-dis',
  templateUrl: './hab-dis.page.html',
  styleUrls: ['./hab-dis.page.scss'],
})
export class HabDisPage implements OnInit {
  private path = 'Reserva/';
  reservas: Reserva[] = [];


  constructor(private router:Router, public database: FirestoreService, private activateRoute: ActivatedRoute, private authSvc:AuthService, private menucontroler: MenuController) { }

  ngOnInit() {
    var fecha1 = this.activateRoute.snapshot.paramMap.get('fechaInicio');
    var fecha2 = this.activateRoute.snapshot.paramMap.get('fechaFin');
    
    this.database.getCollection<Reserva>(this.path).subscribe(res => {
      this.reservas = res;
      this.habocupadas(fecha1, fecha2)
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

  habocupadas(fechaECliente, fechaSCliente) {
    var ArraydehabitacionesOcupa = new Array();

    for (var i = 0; i < this.reservas.length; i += 1) {
      console.log("primer if"+this.reservas[i].checkInInt + " "+ fechaECliente+ "jdhdhdhdhdh" +this.reservas[i].checkOutInt+" "+fechaSCliente );
      if (this.reservas[i].checkInInt <= fechaECliente && this.reservas[i].checkOutInt <= fechaSCliente) {
        console.log("segundo if"+this.reservas[i].checkInInt + " "+ fechaECliente+ "jdhdhdhdhdh" +this.reservas[i].checkOutInt+" "+fechaSCliente );
        if (this.reservas[i].checkInInt <= fechaSCliente && this.reservas[i].checkOutInt <= fechaECliente) {
       
        } else {
          if (this.reservas[i].checkInInt >= fechaSCliente && this.reservas[i].checkOutInt >= fechaSCliente) {
          } else {
            ArraydehabitacionesOcupa.push(this.reservas[i].habitacion);
          }
        }
      } else {
       if(this.reservas[i].checkInInt >= fechaECliente && this.reservas[i].checkOutInt >= fechaECliente){
        if (this.reservas[i].checkInInt >= fechaSCliente && this.reservas[i].checkOutInt >= fechaSCliente) {
            } else {
              ArraydehabitacionesOcupa.push(this.reservas[i].habitacion);
            }
       }else{
        ArraydehabitacionesOcupa.push(this.reservas[i].habitacion);
       }


      }
    }

    for (let index = 0; index < ArraydehabitacionesOcupa.length; index++) {
      console.log(ArraydehabitacionesOcupa[index]+'bolbi')
    }
  }

}
