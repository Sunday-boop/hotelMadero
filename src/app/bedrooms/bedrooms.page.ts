import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


export interface Data {
  preciosH: string;
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
      { name: 'FECHA' },
      { name: 'HABITACION 1' },
      { name: 'HABITACION 2' },
      { name: 'HABITACION 3' },
      { name: 'HABITACION 4' },
      { name: 'HABITACION 5' },
      { name: 'HABITACION 6' },
      { name: 'HABITACION 7' },
      { name: 'HABITACION 8' },
     
    ];
  

    this.http.get<Data>('../../assets/preciosH.json')
      .subscribe((res) => {
        console.log(res)
        
        this.rows = res.preciosH;
       
      });

      
  }

  ngOnInit() {
    
  }

}
