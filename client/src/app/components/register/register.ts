import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  email = '';
  username = '';
  password = '';
  dateOfBirth = '';

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  register() {

    const newUser = {
      email: this.email,
      username: this.username,
      password: this.password,
      dateOfBirth: this.dateOfBirth,
      role: 'user'
    };

    this.authService.register(
      newUser
    ).subscribe({
      next: (User) => {
        alert('User Registered!');
        this.authService.setCurrentUser(User)
        this.router.navigate(['/login'])
      },

      error: (error) => {
        console.error(error);
        alert('Registration Failed');
      }
    });

  }
}
