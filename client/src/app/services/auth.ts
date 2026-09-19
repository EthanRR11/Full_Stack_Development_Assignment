import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(username: string, password: string) {

    return this.http.post<any>(
      'http://localhost:3000/api/login',
      {
        username,
        password
      }
    );

  }

  register(user: any) {

    return this.http.post(
      'http://localhost:3000/api/register',
      user
    );

  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate([''])
  }

  isloggedin(){
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isGroupAdmin(){
    const user = this.getCurrentUser();

    return user.role === 'groupadmin'
  }

  isSuperAdmin(){
    const user = this.getCurrentUser();

    return user.role === 'superadmin'

  }

}