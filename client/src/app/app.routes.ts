import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Admin } from './components/admin_dashboard/admin';
import { Groups } from './components/groups/groups';
import { Channels } from './components/channels/channels';
import { Register } from './components/register/register';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate:[authGuard] },
  { path: 'admin_dashboard', component: Admin, canActivate:[adminGuard] },
  { path: 'groups',component: Groups, canActivate:[authGuard]},
  { path: 'channels', component: Channels, canActivate:[authGuard]},
  { path: 'register', component: Register},
  { path: 'login',component: Login},
  { path: 'profile', component: Profile, canActivate:[authGuard]}
];