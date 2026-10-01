import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  username = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.authService
      .checkBootstrap()
      .subscribe({

        next: (response) => {

          if (response.bootstrapRequired) {

            this.router.navigate(['/bootstrap']);

          }

        }

      });

  }

  login() {

    this.authService.login(
      this.username,
      this.password
    ).subscribe({

      next: (user) => {

        this.authService.setCurrentUser(user);

        if (user.role === 'superadmin') {

          this.router.navigate([
            '/admin_dashboard'
          ]);

        }
        else {

          this.router.navigate([
            '/dashboard'
          ]);

        }

      },

      error: () => {

        alert('Invalid Login');

      }

    });

  }
}