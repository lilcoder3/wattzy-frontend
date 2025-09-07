import { Routes } from '@angular/router';
import {LoginComponent} from './componente/login-component/login-component';
import {RegisterComponent} from './componente/register-component/register-component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent,},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
];
