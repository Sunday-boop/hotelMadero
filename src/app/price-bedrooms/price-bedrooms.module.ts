import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceBedroomsPageRoutingModule } from './price-bedrooms-routing.module';

import { PriceBedroomsPage } from './price-bedrooms.page';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    PriceBedroomsPageRoutingModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: [PriceBedroomsPage]
})
export class PriceBedroomsPageModule {}
