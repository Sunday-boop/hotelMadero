import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusquedaAdminPage } from './busqueda-admin.page';

const routes: Routes = [
  {
    path: '',
    component: BusquedaAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusquedaAdminPageRoutingModule {}
