import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Admin } from './admin/admin';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'admin', component: Admin }
];
