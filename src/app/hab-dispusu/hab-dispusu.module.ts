import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabDispusuPageRoutingModule } from './hab-dispusu-routing.module';

import { HabDispusuPage } from './hab-dispusu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabDispusuPageRoutingModule
  ],
  declarations: [HabDispusuPage]
})
export class HabDispusuPageModule {}
