import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BedroomsPageRoutingModule } from './bedrooms-routing.module';

import { BedroomsPage } from './bedrooms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BedroomsPageRoutingModule
  ],
  declarations: [BedroomsPage]
})
export class BedroomsPageModule {}
