import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Admin } from './admin_dashboard/admin';
import { Groups } from './groups/groups';
import { Channels } from './channels/channels';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'admin_dashboard', component: Admin },
  { path: 'groups',component: Groups},
  { path: 'channels', component: Channels},
  { path: 'register', component: Register},
  { path: 'login',component: Register}
];