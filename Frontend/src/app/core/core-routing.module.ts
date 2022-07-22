import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
{ path: 'register',  component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'app', loadChildren: () => import('../feature/feature.module').then(m => m.FeatureModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }