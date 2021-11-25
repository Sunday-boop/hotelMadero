import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPricePageRoutingModule } from './edit-price-routing.module';

import { EditPricePage } from './edit-price.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPricePageRoutingModule
  ],
  declarations: [EditPricePage]
})
export class EditPricePageModule {}
