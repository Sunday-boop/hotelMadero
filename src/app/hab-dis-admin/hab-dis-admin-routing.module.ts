import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HabDisAdminPage } from './hab-dis-admin.page';

const routes: Routes = [
  {
    path: '',
    component: HabDisAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HabDisAdminPageRoutingModule {}
