import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabDisPageRoutingModule } from './hab-dis-routing.module';

import { HabDisPage } from './hab-dis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabDisPageRoutingModule
  ],
  declarations: [HabDisPage]
})
export class HabDisPageModule {}
