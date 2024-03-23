import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../app-services-utils/api.service';
import { UtilService } from '../app-services-utils/util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  register(
    e: Event,
    email: string,
    username: string,
    password: string,
    repassword: string
  ) {
    e.preventDefault();

    if (password != repassword) {
      alert('passwords not matched!');
    }

    const regData = { email, username, password };

    this.apiService
      .post('/users', regData)
      .subscribe((userData) => UtilService.setUserData(userData));
  }

  login(username: string, password: string) {
    this.apiService
      .post('/login', { username, password })
      .subscribe((userData) => UtilService.setUserData(userData));
  }
}

/* 
createdAt
: 
"2024-03-23T12:49:24.933Z"
email
: 
"mitko@abv.bg"
objectId
: 
"BADONE1MfD"
sessionToken
: 
"r:2c33b79aa596e1602413d9b39231db8a"
updatedAt
: 
"2024-03-23T12:49:24.933Z"
username
: 
"Mitko"

*/
