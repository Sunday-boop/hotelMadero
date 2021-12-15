import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReservationAdminPageRoutingModule } from './add-reservation-admin-routing.module';

import { AddReservationAdminPage } from './add-reservation-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddReservationAdminPageRoutingModule
  ],
  declarations: [AddReservationAdminPage]
})
export class AddReservationAdminPageModule {}
