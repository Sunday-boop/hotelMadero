import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Habitacion, Nota, Reserva, Usuario } from '../shared/userinterface';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.page.html',
  styleUrls: ['./add-reservation.page.scss'],
})
export class AddReservationPage implements OnInit {

  addHabitacion: Reserva ={
    checkIn: '',
    checkInInt: null,
    checkOut: '',
    checkOutInt: null,
    correoCliente: '',
    estado: 'lift',
    fechaRealizacion: '',
    habitacion: null,
    idReserva: this.database.getId(),
    idUsuario: '',
    monto: null,
    nombreCliente: '',
    numeroTarjeta: null,
    telefonoCliente: null,
    titularTarjeta: '',
  }

  newNota: Nota = {
    id: this.database.getId(),
    checkIn: '',
    checkOut: '',
    habitacion: null,
    nota: '', 
  }

  newHabitacion: Habitacion [] = [];
  public NumeroDeDiasHospedados: number[] = [];

  private path = 'Habitacion/';
  private id: string;
  private monto: string;
  dias: number;

  constructor(private router:Router, 
    private activateRoute: ActivatedRoute,
    private authSvc:AuthService, 
    public database: FirestoreService,
    private menucontroler: MenuController) { }

  ngOnInit() {
    this.monto= this.activateRoute.snapshot.paramMap.get('monto');
    this.id = this.activateRoute.snapshot.paramMap.get('habitacion');
    this.database.getCollectionConsulta<Habitacion>(this.path, 'numero', parseInt(this.id)).subscribe(res => {
      this.newHabitacion = res
      this.newHabitacion[0].monto=parseInt(this.monto);
    });

    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      var email = user.email;
      console.log(email)
    }

    this.database.getCollectionConsulta<Usuario>('Usuario/', 'correo', email).subscribe(res => {
      console.log(res[0].id)
      this.addHabitacion.idUsuario = res[0].id
    });

    var fechaECliente = parseInt(this.activateRoute.snapshot.paramMap.get('fechaInicio'))
    var fechaSCliente = parseInt(this.activateRoute.snapshot.paramMap.get('fechaFin'))
    
    for (fechaECliente; fechaECliente <= fechaSCliente; fechaECliente++) {
      this.NumeroDeDiasHospedados.push(fechaECliente);
    }

    this.dias = this.NumeroDeDiasHospedados.length
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

  agregarReserva(){
    this.addHabitacion.checkInInt = parseInt(this.activateRoute.snapshot.paramMap.get('fechaInicio'))
    this.addHabitacion.checkOutInt = parseInt(this.activateRoute.snapshot.paramMap.get('fechaFin'))
    this.addHabitacion.habitacion = parseInt(this.activateRoute.snapshot.paramMap.get('habitacion'))
    this.addHabitacion.monto = parseInt(this.activateRoute.snapshot.paramMap.get('monto'))
    this.addHabitacion.checkIn = this.sacarFecha(this.activateRoute.snapshot.paramMap.get('fechaInicio'))
    this.addHabitacion.checkOut = this.sacarFecha(this.activateRoute.snapshot.paramMap.get('fechaFin'))

    this.newNota.checkIn = this.sacarFecha(this.activateRoute.snapshot.paramMap.get('fechaInicio'))
    this.newNota.checkOut = this.sacarFecha(this.activateRoute.snapshot.paramMap.get('fechaFin'))
    this.newNota.habitacion = parseInt(this.activateRoute.snapshot.paramMap.get('habitacion'))

    this.database.creatDoc(this.addHabitacion, 'Reserva/', this.addHabitacion.idReserva)
    this.database.creatDoc(this.newNota, 'Nota/', this.addHabitacion.idReserva)
    console.log(this.addHabitacion)
    console.log(this.newNota)
  }

  sacarFecha(fecha){
    var parte1 = fecha.substring(0, 4);
    var parte2 = fecha.substring(4, 6);
    var parte3 = fecha.substring(6, 8);

    var fech = parte1 + "-" + parte2 + "-" + parte3;
    return fech
  }

  habitacionesDisp(){
    this.router.navigate(['hab-dis/'+this.activateRoute.snapshot.paramMap.get('fechaInicio')+'/'+this.activateRoute.snapshot.paramMap.get('fechaFin')])
  }
}
