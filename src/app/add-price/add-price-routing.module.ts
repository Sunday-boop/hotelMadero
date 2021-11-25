import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPricePage } from './add-price.page';

const routes: Routes = [
  {
    path: '',
    component: AddPricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPricePageRoutingModule {}
