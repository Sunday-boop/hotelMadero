import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { MenuController } from '@ionic/angular';

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

  constructor(private http: HttpClient, private menucontroler: MenuController) {
    this.columns = [
      { name: 'ID' },
      { name: 'FECHA' },
      { name: 'CLIENTE' },
      { name: 'HABITACION' },
      { name: 'Notas', prop: 'Id'}
    ];

    this.http.get<Data>('../../assets/notas.json')
      .subscribe((res) => {
        console.log(res)
        this.rows = res.notas;
      });
  }

  ngOnInit() {
  }

  openMenu(){
    this.menucontroler.toggle('main-menu')
  }
}
