import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PriceBedroomsPage } from './price-bedrooms.page';

const routes: Routes = [
  {
    path: '',
    component: PriceBedroomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PriceBedroomsPageRoutingModule {}
