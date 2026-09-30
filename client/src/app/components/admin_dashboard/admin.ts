import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  constructor(private router: Router,
              private authService: AuthService
  ) {

    const user = this.authService.getCurrentUser()

    if (!user.username) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.role !== 'superadmin') {
      this.router.navigate(['/dashboard']);
      return;
    }

  }

  logout() {

    this.authService.logout()

  }

}