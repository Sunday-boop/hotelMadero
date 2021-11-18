import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Habitacion } from '../shared/userinterface';
import { FirestoreService } from '../services/firestore.service';


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
  private path = 'Habitacion/'


  constructor(private http: HttpClient, public database: FirestoreService) {}

  ngOnInit() {
    this.getHabitaciones()
  }

  getHabitaciones(){
    this.database.getCollection<Habitacion>(this.path).subscribe(res => {
      this.habitaciones = res;
      // console.log(this.habitaciones)
    });
  }
}
