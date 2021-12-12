import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  constructor(private router:Router, private authSvc:AuthService, private menucontroler: MenuController) { }

  ngOnInit() {
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
    this.menucontroler.enable(true, 'client-menu');
    this.menucontroler.open('client-menu');
  }

  parametros(fechaInicio, fechaFin){
    var fecha1 = this.convertirAInt(fechaInicio.value);
    var fecha2 = this.convertirAInt(fechaFin.value);
    

    this.router.navigate(['hab-dis/'+fecha1+'/'+fecha2])
  }

  convertirAInt(fecha){
    var fullDate = new Date(fecha);
    var twoDigitMonth = fullDate.getMonth() + "";
    if (twoDigitMonth.length == 1)
      twoDigitMonth = "0" + twoDigitMonth;

    var twoDigitDate = fullDate.getDate() + "";
    if (twoDigitDate.length == 1)
      twoDigitDate = "0" + twoDigitDate;
    var currentDate = fullDate.getFullYear() + "" + (parseInt(twoDigitMonth) + 1) + "" + parseInt(twoDigitDate);
    return currentDate;
  }
}
