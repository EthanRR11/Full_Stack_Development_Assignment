import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-bootstrap',
  imports: [FormsModule],
  templateUrl: './bootstrap.html',
  styleUrl: './bootstrap.css'
})
export class Bootstrap {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  createAdmin() {

    this.authService.bootstrap(
      this.username,
      this.password
    ).subscribe({

      next: () => {

        this.authService.setCurrentUser({
          username: this.username,
          role: 'superadmin'
        });

        alert('Super Admin Created');

        this.router.navigate([
          '/admin_dashboard'
        ]);

      },

      error: () => {

        alert('Failed to Create Super Admin');

      }

    });

  }

}