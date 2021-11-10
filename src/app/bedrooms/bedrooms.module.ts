import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BedroomsPageRoutingModule } from './bedrooms-routing.module';

import { BedroomsPage } from './bedrooms.page';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BedroomsPageRoutingModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  declarations: [BedroomsPage], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BedroomsPageModule {}
