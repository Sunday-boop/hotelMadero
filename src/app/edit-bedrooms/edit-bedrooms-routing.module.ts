import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBedroomsPage } from './edit-bedrooms.page';

const routes: Routes = [
  {
    path: '',
    component: EditBedroomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBedroomsPageRoutingModule {}
