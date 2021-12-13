import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Precio, Reserva } from '../shared/userinterface';
import { Habitacion } from '../shared/userinterface';

@Component({
  selector: 'app-hab-dis',
  templateUrl: './hab-dis.page.html',
  styleUrls: ['./hab-dis.page.scss'],
})
export class HabDisPage implements OnInit {
  private path = 'Reserva/';
  private pathh = 'Habitacion/';
  reservas: Reserva[] = [];
  NumeroHabDisp: number[] = [];
  HabitacionesDiso: Habitacion[] = [];


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
      //console.log("primer if"+this.reservas[i].checkInInt + " "+ fechaECliente+ "jdhdhdhdhdh" +this.reservas[i].checkOutInt+" "+fechaSCliente );
      if (this.reservas[i].checkInInt <= fechaECliente && this.reservas[i].checkOutInt <= fechaSCliente) {
        //console.log("segundo if"+this.reservas[i].checkInInt + " "+ fechaECliente+ "jdhdhdhdhdh" +this.reservas[i].checkOutInt+" "+fechaSCliente );
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
 

    for (let index = 1; index <= 12; index++) {
      if(ArraydehabitacionesOcupa.includes(index)){
    }else{
      this.NumeroHabDisp.push(index);
    }
  } 

  for(let index = 0; index < this.NumeroHabDisp.length; index++){
console.log("xoxox"+  this.NumeroHabDisp[index] )
  }

this.database.getCollection<Habitacion>(this.pathh).subscribe(res => {

  this.HabitacionesDiso=res;

  for(let index = 0; index < this.HabitacionesDiso.length; index++){
   for(let indexx = 0; indexx < this.NumeroHabDisp.length; indexx++){
          if(this.NumeroHabDisp[indexx]==this.HabitacionesDiso[index].numero){
            console.log("edded"+this.HabitacionesDiso[index].numero);
          }
       }
   
    }


      
});  


  }


}
