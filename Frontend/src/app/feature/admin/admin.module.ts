import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { GestionUserComponent } from './gestion-user/gestion-user.component';
import { GestionTableComponent } from './gestion-table/gestion-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';




@NgModule({
  declarations: [
    GestionUserComponent,
    GestionTableComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatExpansionModule
  ],
  exports: [
    GestionUserComponent,
    GestionTableComponent,
    DashboardComponent
  ]
})
export class AdminModule { }
