import { Routes } from '@angular/router';
import { LoginComponent } from './login2/login.component';
import { RegisterComponent } from './register2/register.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: ':register',
    component: RegisterComponent,
  },
];
