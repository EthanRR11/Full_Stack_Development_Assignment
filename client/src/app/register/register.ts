import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  age = 0;

  constructor(private http: HttpClient) {}

  register() {

    const newUser = {
      email: this.email,
      username: this.username,
      password: this.password,
      age: this.age,
      role: 'user'
    };

    this.http.post(
      'http://localhost:3000/api/register',
      newUser
    ).subscribe({
      next: () => {
        alert('User Registered!');
      },

      error: (error) => {
        console.error(error);
        alert('Registration Failed');
      }
    });

  }

}
