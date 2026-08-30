import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {

    if(this.username === 'admin' && this.password === 'admin123'){
      this.router.navigate(['/admin']);
      return;
    }

    if(this.username === 'user' && this.password === 'password'){
      this.router.navigate(['/dashboard']);
      return;
    }

    alert('Invalid Login');

  }






}
