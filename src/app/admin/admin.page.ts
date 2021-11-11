import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

export interface Data {
  reservas: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  encapsulation: ViewEncapsulation.None
}) 
export class AdminPage{
  public data: Data;
  public columns: any;
  public rows: any;

  constructor(private router:Router, private authSvc:AuthService, private http: HttpClient) { 
    this.columns = [
      { name: 'ID' },
      { name: 'FECHA' },
      { name: 'CLIENTE' },
      { name: 'HABITACIONES' },
      { name: 'EMPLEADO' },
      { name: 'TOTAL' },
      { name: 'VER MAS', prop: 'Id'}
    ];

    this.http.get<Data>('../../assets/reservas.json')
      .subscribe((res) => {
        console.log(res)
        
        this.rows = res.reservas;
       
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

}
