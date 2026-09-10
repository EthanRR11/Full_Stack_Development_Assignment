import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    private http: HttpClient,
    private router: Router
  ) {}

  createAdmin() {

    this.http.post(
      'http://localhost:3000/api/bootstrap',
      {
        username: this.username,
        password: this.password
      }
    ).subscribe(() => {



      alert('Super Admin Created');
      localStorage.setItem(
      'currentUser',
      JSON.stringify({
        username: this.username,
        role: 'superadmin'
      })
    );

    this.router.navigate(['/admin_dashboard']);

    });

  }

}