import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


export interface Data {
  movies: string;
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
      { name: 'Name' },
      { name: 'Company' },
      { name: 'Genre' },
      { name: 'Notas', prop: 'Id'}
    ];
  

    this.http.get<Data>('../../assets/movies.json')
      .subscribe((res) => {
        console.log(res)
        
        this.rows = res.movies;
       
      });

      
  }

  ngOnInit() {
    
  }

}
