import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BedroomsPage } from './bedrooms.page';

const routes: Routes = [
  {
    path: '',
    component: BedroomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BedroomsPageRoutingModule {}
