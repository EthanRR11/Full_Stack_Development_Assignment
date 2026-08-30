import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

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

    this.http.post<any>(
      'http://localhost:3000/api/login',
      {
        username: this.username,
        password: this.password
      }
    ).subscribe({

      next: (user) => {

        localStorage.setItem(
          'currentUser',
          JSON.stringify(user)
        );

        this.router.navigate(['/dashboard']);

      },

      error: () => {

        alert('Invalid Login');

      }

    });

  }

}