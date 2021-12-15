import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabDispusuPage } from './hab-dispusu.page';

const routes: Routes = [
  {
    path: '',
    component: HabDispusuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabDispusuPageRoutingModule {}
