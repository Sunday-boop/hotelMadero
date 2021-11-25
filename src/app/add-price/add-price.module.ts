import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPricePageRoutingModule } from './add-price-routing.module';

import { AddPricePage } from './add-price.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPricePageRoutingModule
  ],
  declarations: [AddPricePage]
})
export class AddPricePageModule {}
