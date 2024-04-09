import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../app-services-utils/api.service';
import { UtilService } from '../app-services-utils/util.service';
import { Router } from '@angular/router';
import {UserB4app}from '../globals/types/back4app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) {}

  register(
    email: string,
    username: string,
    password: string,
  ) {
    

    const regData = { email, username, password };

    this.apiService.post('/api/users', regData).subscribe((userData) => {
    
      this.login(email,password)
      this.router.navigateByUrl('/home');
    },
    (error)=>{
      console.error('Register failed:', error);
        alert('Register failed:'+'\n'+error.error.error + '\n' + error.message);
    }
    );
  }

  // username can be email
  login(email: string, password: string) {
    this.apiService.post('/api/login', { email, password }).subscribe(
      (userData) => {
        this.router.navigateByUrl('/home');
      }
    );
  }

  static isLoggedUser() {
    return !!UtilService.getUserData();
  }

  logout() {
    this.apiService.post('/api/logout').subscribe(
      (data) => {
        console.log('Logout successful:', data);
        // Additional logout logic (redirect, clear session, etc.)
        UtilService.clearUserData();
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.error('Logout failed:', error);
        alert('Logout failed:'+'\n'+error.error.error + '\n' + error.message);
      }
    );
  }

  getUserServerInfo() {
    this.apiService.get('/api/users/me').subscribe((data) => console.log(data));
  }
}
