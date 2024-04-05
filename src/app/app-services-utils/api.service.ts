import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

const host: string = 'https://parseapi.back4app.com';
const appId: string = 'PbsUtdKVxe7rbYDL5553Ev3QDGDd9DPbP6dnl8tU'; // Application ID
const apiKey: string = 'OqvCHBHIaTwKUIAFdQjjPTyrPScywEX6uIM5rqE6'; // JavaScript key
const restApiKey: string = 'xDflhIlMZQ9VVZSyApQE9cDh4XMB2PJ84CH57Qzy'; //REST API key

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get userToken() {
    return UtilService.getUserData()?.sessionToken || '';
  }

  private options = {
    headers: new HttpHeaders({
      'X-Parse-Application-Id': appId,
      'X-Parse-REST-API-Key': restApiKey,
      'X-Parse-JavaScript-Key': apiKey,
      'X-Parse-Session-Token': this.userToken,
    }),
    body: {},
  };

  get(url: string): Observable<Object> {
    return this.http.get<Object>(`${host}${url}`, this.options);
  }

  post(url: string, data?: Object): Observable<Object> {
    //!
    //# update Tokken by request

    let headers = this.options.headers;
    const userToken = UtilService.getUserData()?.sessionToken || '';

    if (data !== undefined) {
      headers = headers
        .set('Content-Type', 'application/json')
        .set('X-Parse-Session-Token', userToken);
    }

    const options = { headers: headers, body: JSON.stringify(data) };

    return this.http.post<Object>(`${host}${url}`, data, options);
  }
}
