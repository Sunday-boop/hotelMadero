import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReservationPageRoutingModule } from './add-reservation-routing.module';

import { AddReservationPage } from './add-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddReservationPageRoutingModule
  ],
  declarations: [AddReservationPage]
})
export class AddReservationPageModule {}
