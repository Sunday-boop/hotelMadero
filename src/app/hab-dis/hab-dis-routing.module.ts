import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabDisPage } from './hab-dis.page';

const routes: Routes = [
  {
    path: '',
    component: HabDisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabDisPageRoutingModule {}
