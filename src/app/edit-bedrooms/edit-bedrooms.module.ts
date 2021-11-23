import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBedroomsPageRoutingModule } from './edit-bedrooms-routing.module';

import { EditBedroomsPage } from './edit-bedrooms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBedroomsPageRoutingModule
  ],
  declarations: [EditBedroomsPage]
})
export class EditBedroomsPageModule {}
