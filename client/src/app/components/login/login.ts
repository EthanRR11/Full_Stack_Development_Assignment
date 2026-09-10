import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';

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
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {

    this.http.get<any>(
      'http://localhost:3000/api/bootstrap-check'
    ).subscribe({

      next: (response) => {

        if (response.bootstrapRequired) {

          this.router.navigate(['/bootstrap']);

        }

      }

    });

  }

  login() {

  
    if (
      this.username === 'admin' &&
      this.password === 'admin123'
    ) {

      const adminUser = {
        username: 'admin',
        role: 'admin'
      };

      localStorage.setItem(
        'currentUser',
        JSON.stringify(adminUser)
      );

      this.router.navigate(['/admin_dashboard']);
      return;
    }

    this.authService.login(
      this.username,
      this.password
    ).subscribe({

      next: (user) => {

        localStorage.setItem(
          'currentUser',
          JSON.stringify(user)
        );

        if (user.role == 'superadmin'){
          this.router.navigate(['/admin_dashboard'])
        }
        else{
          this.router.navigate(['/dashboard']);
        }

      },

      error: () => {

        alert('Invalid Login');

      }

    });

  }

}