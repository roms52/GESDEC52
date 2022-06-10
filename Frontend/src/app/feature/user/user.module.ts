import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualisationComponent } from './visualisation/visualisation.component';
import { FactureComponent } from './facture/facture.component';
import { ControleComponent } from './controle/controle.component';
import { ImportComponent } from './import/import.component';
import { UserRoutingModule } from './user-routing.moule';




@NgModule({
  declarations: [
    VisualisationComponent,
    FactureComponent,
    ControleComponent,
    ImportComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    VisualisationComponent,
    FactureComponent,
    ControleComponent,
    ImportComponent
  ]
})
export class UserModule { }
