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
  private pathhh = 'Precio/'
  reservas: Reserva[] = [];
  NumeroHabDisp: number[] = [];
  HabitacionesDiso: Habitacion[] = [];
  habitacionesDisponibles: Habitacion[]=[];
   //pa sacar los dias linea 19
 public NumeroDeDiasHospedados: number[] = [];
 //pa guardar las cantidades a cobrar linea 21
 PreciosAPagar: number[] = [];
  precios: Precio[];


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
  for(fechaECliente; fechaECliente <= fechaSCliente; fechaECliente++){
    //console.log("kkkkkk"+fechaECliente)
    this.NumeroDeDiasHospedados.push(fechaECliente);
  }

this.database.getCollection<Habitacion>(this.pathh).subscribe(res => {

  this.HabitacionesDiso=res;

  for(let index = 0; index < this.HabitacionesDiso.length; index++){
   for(let indexx = 0; indexx < this.NumeroHabDisp.length; indexx++){
          if(this.NumeroHabDisp[indexx]==this.HabitacionesDiso[index].numero){
            console.log("edded"+this.HabitacionesDiso[index].numero);
            this.habitacionesDisponibles.push(this.HabitacionesDiso[index])
          }
       }
   
    }


      
});  
 this.PrecioFinal()

  }


  PrecioFinal(){

   
    // for(let i=0; i < this.NumeroDeDiasHospedados.length; i++){
    //   console.log("kkkkkk"+this.NumeroDeDiasHospedados[i])
      
    // }
    var fullDate = new Date(); console.log(fullDate);
    var twoDigitMonth = fullDate.getMonth() + "";
    if (twoDigitMonth.length == 1)
      twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1)
      twoDigitDate = "0" + twoDigitDate;
    var currentDate = fullDate.getFullYear() + "" + (parseInt(twoDigitMonth) + 1) + "" + parseInt(twoDigitDate); 

    
    this.database.getCollectionOrdenada<Precio>(this.pathhh, 'fecha', 'date', parseInt(currentDate)).subscribe(res => {
      this.precios = res;
       console.log("entrogg")
        
        for(let index = 0; index < this.precios.length; index++){
          console.log("entra el primer if");
          for(let indexx = 0; indexx <this.NumeroDeDiasHospedados.length; indexx++){
            console.log("entra a el segundo"+this.NumeroDeDiasHospedados[indexx]+"  "+this.precios[index].date);
              if( this.NumeroDeDiasHospedados[indexx]== this.precios[index].date){
                console.log("entra al if gg"+this.precios[index].precio);
                     this.PreciosAPagar.push(this.precios[index].precio)
                if(this.NumeroDeDiasHospedados.length == this.PreciosAPagar.length) {
                       break;
                }
              }
            
            }
        }

        for(let i=0; i < this.PreciosAPagar.length; i++){
            console.log("pagarpagar"+this.PreciosAPagar[i])
            
          }


    });


  }




}
