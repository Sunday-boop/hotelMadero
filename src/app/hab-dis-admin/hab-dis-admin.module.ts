import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HabDisAdminPageRoutingModule } from './hab-dis-admin-routing.module';

import { HabDisAdminPage } from './hab-dis-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabDisAdminPageRoutingModule
  ],
  declarations: [HabDisAdminPage]
})
export class HabDisAdminPageModule {}
