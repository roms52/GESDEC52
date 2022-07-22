import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { CoreRoutingModule } from './core-routing.module';



@NgModule({
  declarations: [
    RegisterComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CoreRoutingModule
  ],
  exports: [
    RegisterComponent,
    NavbarComponent,
    LoginComponent
  ]
})
export class CoreModule { }
