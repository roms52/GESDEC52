import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualisationComponent } from './visualisation/visualisation.component';

const routes: Routes = [
  { path: '',  component: VisualisationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }