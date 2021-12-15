import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}

  parametros(fechaInicio, fechaFin){
    var fecha1 = this.convertirAInt(fechaInicio.value);
    var fecha2 = this.convertirAInt(fechaFin.value);
    

    this.router.navigate(['hab-dispusu/'+fecha1+'/'+fecha2])
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
