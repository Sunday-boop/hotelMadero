import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { Habitacion, Usuario } from '../shared/userinterface';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { deleteUser, getAuth, signInWithEmailAndPassword } from "firebase/auth";


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
  private id: Number;
  private password: string;
  private correo: string;

  con: string;
  cor: string;

  constructor(private http: HttpClient, public alerta: AlertController, private router: Router, public database: FirestoreService, private menucontroler: MenuController) {
    this.columns = [
      { name: 'id'},
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
    const auth = getAuth();
    var user = getAuth().currentUser.email;

    this.database.getCollectionConsulta<Usuario>('Usuario', 'correo', user).subscribe(res => {
      this.cor = res[0].correo
      this.con = res[0].password
    });

    signInWithEmailAndPassword(auth, this.cor, this.con)
  }

  openMenu(){
    this.menucontroler.toggle('main-menu')
  }

  onActivate(event) {
    if (event.type == 'click') {
       this.id = event.row.id
       this.password = event.row.password
       this.correo = event.row.correo
    }
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
            this.deleteUsu(this.id, this.correo, this.password)
            this.router.navigate(['users'])
          }
        }
      ]
    });
    (await alert).present();
  }

  deleteUsu(id, correo, password){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, correo, password).then(function (info) {
      var user = getAuth().currentUser;
      user.delete();
    });
   this.database.deleteDoc(this.path, id)
   signInWithEmailAndPassword(auth, this.cor, this.con)
    // console.log(user)
    // deleteUser(user)
  }
}


