import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Admin } from './components/admin_dashboard/admin';
import { Groups } from './components/groups/groups';
import { Channels } from './components/channels/channels';
import { Register } from './components/register/register';
import { Bootstrap } from './components/bootstrap/bootstrap';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'admin_dashboard', component: Admin },
  { path: 'groups',component: Groups},
  { path: 'channels', component: Channels},
  { path: 'register', component: Register},
  { path: 'login',component: Register},
  { path: 'bootstrap', component: Bootstrap}
];