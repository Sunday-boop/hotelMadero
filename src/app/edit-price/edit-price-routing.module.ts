import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPricePage } from './edit-price.page';

const routes: Routes = [
  {
    path: '',
    component: EditPricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPricePageRoutingModule {}
