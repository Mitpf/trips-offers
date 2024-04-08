import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: string): Observable<Object> {
    return this.http.get<Object>(url);
  }

  post(url: string, data?: Object): Observable<Object> {
    return this.http.post<Object>(url, data);
  }
}
