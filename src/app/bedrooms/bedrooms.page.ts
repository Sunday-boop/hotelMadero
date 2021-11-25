import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Habitacion } from '../shared/userinterface';
import { FirestoreService } from '../services/firestore.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';


export interface Data {
  usuarios: string;
}

@Component({
  selector: 'app-bedrooms',
  templateUrl: './bedrooms.page.html',
  styleUrls: ['./bedrooms.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BedroomsPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;

  habitaciones: Habitacion[] = [];
  private path = 'Habitacion/';
  private id: Number;


  constructor(private http: HttpClient, public alerta: AlertController, private menucontroler: MenuController, private router: Router, public database: FirestoreService) {
    this.columns = [
      { name: 'id' },
      { name: 'numero' },
      { name: 'edificio' },
      { name: 'piso' },
      { name: 'capacidadA'},
      {name: 'capacidadM'},
      {name: 'tipo'},
      {name: 'numeroCama'},
      {name: 'tipoCama'},
    ];

    this.database.getCollection<Habitacion>(this.path).subscribe(res => {
      this.habitaciones = res;
      this.rows = this.habitaciones
    });    

    this.menuActive;
  }

  ngOnInit() {
  }

  async alertaEliminar(){
    let alert = this.alerta.create({
      header: 'Advertencia',
      message: 'Estas seguro que deseas elminar esta habitacion?',
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
            this.deleteHabitacion(this.id)
            this.router.navigate(['bedrooms'])
          }
        }
      ]
    });
    (await alert).present();
  }

  onActivate(event) {
    if (event.type == 'click') {
       this.id = event.row.id
       console.log(this.id)
    }
  }

  deleteHabitacion(id){
    console.log('awebo ya podemos hacer el de eliminar '+ this.id)
    this.database.deleteDoc(this.path, id)
  }

  async alertaEditar(){
    let alert = this.alerta.create({
      header: 'Advertencia',
      message: 'Deseas editar esta habitacion?',
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
            // this.deleteHabitacion(this.id)
            this.router.navigate(['bedrooms/'+this.id])
          }
        }
      ]
    });
    (await alert).present();
  }

  editarHabitacion(){
    console.log('recibo el id '+this.id)
    // this.router.navigate(['bedrooms/'+this.id])
  }

  openMenu(){
    this.menucontroler.toggle('main-menu')
  }

  menuActive(){
    this.menucontroler.enable(true, 'main-menu')
    this.menucontroler.enable(false, 'client-menu')
  }
}
