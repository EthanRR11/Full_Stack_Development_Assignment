import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
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
  }

}