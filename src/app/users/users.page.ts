import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Habitacion, Usuario } from '../shared/userinterface';
import { MenuController } from '@ionic/angular';

export interface Data {
  usuarios: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;

  usuarios: Usuario[] = [];
  private path = 'Usuario/';

  constructor(private http: HttpClient, public database: FirestoreService, private menucontroler: MenuController) {
    this.columns = [
      { name: 'nombre' },
      { name: 'apellidoP' },
      { name: 'apellidoM' },
      { name: 'correo' },
      { name: 'VER MAS'}
    ];

    this.database.getCollection<Usuario>(this.path).subscribe(res => {
      this.usuarios = res;
      this.rows = this.usuarios
    });  
  }

  ngOnInit() {
  }

  openMenu(){
    this.menucontroler.toggle('main-menu')
  }
}


