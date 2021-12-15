import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReservationAdminPage } from './add-reservation-admin.page';

const routes: Routes = [
  {
    path: '',
    component: AddReservationAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReservationAdminPageRoutingModule {}
