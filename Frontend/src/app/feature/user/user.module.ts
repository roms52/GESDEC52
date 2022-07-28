import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualisationComponent } from './visualisation/visualisation.component';
import { FactureComponent } from './facture/facture.component';
import { ControleComponent } from './controle/controle.component';
import { ImportComponent } from './import/import.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';




@NgModule({
  declarations: [
    VisualisationComponent,
    FactureComponent,
    ControleComponent,
    ImportComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    VisualisationComponent,
    FactureComponent,
    ControleComponent,
    ImportComponent
  ]
})
export class UserModule { }
