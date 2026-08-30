import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  constructor(private router: Router) {

    const user = JSON.parse(
      localStorage.getItem('currentUser') || '{}'
    );

    if (!user.username) {
      this.router.navigate(['/login']);
      return;
    }

    if (user.role !== 'admin') {
      this.router.navigate(['/dashboard']);
      return;
    }

  }

  logout() {

    localStorage.removeItem('currentUser');

    this.router.navigate(['/login']);

  }

}