import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  sendToken(token: string) {
    localStorage.setItem('testLogin', token);
  }

  getToken() {
    localStorage.getItem('testLogin');
  }

  isLoggedIn() {
    return localStorage.getToken !== null;
  }
}
