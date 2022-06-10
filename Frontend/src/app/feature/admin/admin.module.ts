import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { GestionUserComponent } from './gestion-user/gestion-user.component';
import { GestionTableComponent } from './gestion-table/gestion-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    GestionUserComponent,
    GestionTableComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    GestionUserComponent,
    GestionTableComponent,
    DashboardComponent
  ]
})
export class AdminModule { }
