import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditReservationPageRoutingModule } from './edit-reservation-routing.module';

import { EditReservationPage } from './edit-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditReservationPageRoutingModule
  ],
  declarations: [EditReservationPage]
})
export class EditReservationPageModule {}
