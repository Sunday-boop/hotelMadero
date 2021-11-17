import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBedroomsPageRoutingModule } from './add-bedrooms-routing.module';

import { AddBedroomsPage } from './add-bedrooms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBedroomsPageRoutingModule
  ],
  declarations: [AddBedroomsPage]
})
export class AddBedroomsPageModule {}
