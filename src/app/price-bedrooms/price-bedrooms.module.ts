import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceBedroomsPageRoutingModule } from './price-bedrooms-routing.module';

import { PriceBedroomsPage } from './price-bedrooms.page';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriceBedroomsPageRoutingModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: [PriceBedroomsPage]
})
export class PriceBedroomsPageModule {}
