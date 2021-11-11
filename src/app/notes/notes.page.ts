import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

export interface Data {
  movies: string;
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
