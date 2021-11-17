import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBedroomsPage } from './add-bedrooms.page';

const routes: Routes = [
  {
    path: '',
    component: AddBedroomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBedroomsPageRoutingModule {}
