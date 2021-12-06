import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Data, Router } from '@angular/router';
import { Precio } from '../shared/userinterface';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-price-bedrooms',
  templateUrl: './price-bedrooms.page.html',
  styleUrls: ['./price-bedrooms.page.scss'],
})
export class PriceBedroomsPage implements OnInit {

  public data: Data;
  public columns: any;
  public rows: any;

  precios: Precio[] = [];
  private path = 'Precio/';
  private id: Number;
  textoConsultar = ''; 

  constructor(private http: HttpClient, public alerta: AlertController, private router: Router, public database: FirestoreService, private menucontroler: MenuController) { 
    this.columns = [
      { name: 'id' },
      { name: 'habitacion' },
      { name: 'fecha' },
      { name: 'precio' },
    ];

    this.database.getCollection<Precio>(this.path).subscribe(res => {
      this.precios = res;
      this.rows = this.precios
    });

  }

  ngOnInit() {
  
  }

  async alertaEliminar(){
    let alert = this.alerta.create({
      header: 'Advertencia',
      message: 'Estas seguro que deseas elminar este precio?',
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
            this.deletePrecio(this.id)
            this.router.navigate(['price-bedrooms'])
          }
        }
      ]
    });
    (await alert).present();
  }

  

  deletePrecio(id){
    console.log('awebo ya podemos hacer el de eliminar '+ this.id)
    this.database.deleteDoc(this.path, id)
  }

  async alertaEditar(){
    let alert = this.alerta.create({
      header: 'Advertencia',
      message: '¿Deseas editar este precio?',
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
            this.router.navigate(['price-bedrooms/'+this.id])
          }
        }
      ]
    });
    (await alert).present();
  }

  editarHabitacion(){
    console.log('recibo el id '+this.id)
    // this.router.navigate(['price-bedrooms/'+this.id])
  }

  openMenu(){
    this.menucontroler.toggle('main-menu')
  }

  onActivate(event) {
    if (event.type == 'click') {
       this.id = event.row.id
       console.log(this.id)
    }
  }



  consultar(event){
    const path = 'Precio/';
    this.textoConsultar = event.detail.value;

    this.database.getCollectionConsulta<Precio>(path, 'habitacion', this.textoConsultar).subscribe( res =>{
      console.log(res);
      this.precios = res;
      this.rows = this.precios;
    });

    if(this.textoConsultar == ''){
      this.database.getCollection<Precio>(this.path).subscribe(res => {
        this.precios = res;
        this.rows = this.precios
      });
    }
   
  }


}
