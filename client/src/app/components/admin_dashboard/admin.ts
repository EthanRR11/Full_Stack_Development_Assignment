import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import { GroupService } from '../../services/group';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  activePanel = 'dashboard';

  users: any[] = [];
  groups: any[] = [];
  groupRequests: any[] = [];

  totalUsers = 0;
  totalGroups = 0;
  pendingRequests = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private groupService: GroupService
  ) {}

  ngOnInit() {

    const user = this.authService.getCurrentUser();

    if (!user.username) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.role !== 'superadmin') {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loadDashboardData();

  }

  loadDashboardData() {

    this.userService
      .getUsers()
      .subscribe((users: any) => {

        this.users = users;
        this.totalUsers = users.length;

      });

    this.groupService
      .getGroups()
      .subscribe((groups: any) => {

        this.groups = groups;
        this.totalGroups = groups.length;

      });

    this.groupService
      .getGroupRequests()
      .subscribe((requests: any) => {

        this.groupRequests = requests;
        this.pendingRequests = requests.length;

      });

  }

  approveRequest(id: string) {

    this.groupService
      .approveGroupRequest(id)
      .subscribe(() => {

        this.loadDashboardData();

      });

  }

  rejectRequest(id: string) {

    this.groupService
      .rejectGroupRequest(id)
      .subscribe(() => {

        this.loadDashboardData();

      });

  }

  deleteUser(id: string) {

    this.userService
      .deleteUser(id)
      .subscribe(() => {

        this.loadDashboardData();

      });

  }

  logout() {

    this.authService.logout();

  }

}