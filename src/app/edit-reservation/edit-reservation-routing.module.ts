import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditReservationPage } from './edit-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: EditReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditReservationPageRoutingModule {}
