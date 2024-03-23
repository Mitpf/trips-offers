import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../app-services-utils/api.service';
import { UtilService } from '../app-services-utils/util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private utilService: UtilService
  ) {}

  register(
    e: Event,
    email: string,
    username: string,
    password: string,
    repassword: string
  ) {
    e.preventDefault();
    console.log(email, username, password, repassword);

    const regData = { email, username, password };

    this.apiService
      .post('/users', regData)
      .subscribe((userData) => UtilService.setUserData(userData));
  }
}

/* 
const userData = {
  objectId: 'h3A2VDzOP5',
  createdAt: '2024-03-22T22:46:18.114Z',
  sessionToken: 'r:cc66a827318fcbfcf4e519ddcb7940fe',
};
*/

/* 
const headers = new HttpHeaders({
      'X-Parse-Application-Id': appId,
      'X-Parse-REST-API-Key': restApiKey,
      'X-Parse-JavaScript-Key': apiKey,
      'Content-Type': 'application/json',
    });

    return this.http.post(
      host + '/users',
      { email, username, password },
      { headers }
    );


*/
