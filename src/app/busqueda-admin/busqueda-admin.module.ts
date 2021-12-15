import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusquedaAdminPageRoutingModule } from './busqueda-admin-routing.module';

import { BusquedaAdminPage } from './busqueda-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusquedaAdminPageRoutingModule
  ],
  declarations: [BusquedaAdminPage]
})
export class BusquedaAdminPageModule {}
