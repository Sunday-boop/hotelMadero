import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Nota } from '../shared/userinterface';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

export interface Data {
  notas: string;
}


@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;

  notas: Nota[] = [];
  private path = 'Nota/';
  private id: Number;

  constructor(private http: HttpClient, 
    private menucontroler: MenuController, 
    public database: FirestoreService,
    public alerta: AlertController,
    private router: Router) {
    this.columns = [
      { name: 'id' },
      { name: 'checkIn' },
      { name: 'checkOut' },
      { name: 'habitacion' },
      { name: 'nota', }
    ];

    this.database.getCollection<Nota>(this.path).subscribe(res => {
      this.notas = res;
      this.rows = this.notas
    });
  }

  ngOnInit() {
  }

  openMenu(){
    this.menucontroler.toggle('main-menu')
  }

  onActivate(event) {
    if (event.type == 'click') {
       this.id = event.row.id
    }
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
            this.router.navigate(['notes/'+this.id])
          }
        }
      ]
    });
    (await alert).present();
  }
}
