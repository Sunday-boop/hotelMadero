import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


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

  constructor(private http: HttpClient) {
    this.columns = [
      { name: 'ID' },
      { name: 'TIPO' },
      { name: 'NOMBRE' },
      { name: 'CONTRA' },
      { name: 'VER MAS', prop: 'Id'}
    ];
  

    this.http.get<Data>('../../assets/usuarios.json')
      .subscribe((res) => {
        console.log(res)
        this.rows = res.usuarios;
      });

      
  }

  ngOnInit() {
    
  }

}
