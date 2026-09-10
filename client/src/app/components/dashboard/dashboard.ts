import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {

  constructor(private router: Router) {

    const user = localStorage.getItem('currentUser');

    if (!user) {
      this.router.navigate(['']);
    }

  }

  logout() {

    localStorage.removeItem('currentUser');
    this.router.navigate(['']);

  }

}
