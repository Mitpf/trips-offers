import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { EMPTY, Observable, tap } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { UtilService } from './app-services-utils/util.service';
import {
  environment,
  apiHeaders,
} from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
class AppInterceptor implements HttpInterceptor {
  constructor(private router: Router, private location: Location) {}

  hostAPI = '/api';
  private headers = apiHeaders;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.hostAPI)) {
      const sessionToken = UtilService.getUserData()?.sessionToken || '';
      const isBodyData = !!req.body;

      if (isBodyData && req.method.toLowerCase() !== 'get') {
        req = req.clone({
          url: req.url.replace(this.hostAPI, environment.apiUrl),
          // #NO CRED. withCredentials: true,
          setHeaders: {
            ...this.headers,
            'X-Parse-Session-Token': sessionToken,
            'Content-Type': 'application/json',
          },
        });
      } else {
        req = req.clone({
          url: req.url.replace(this.hostAPI, environment.apiUrl),

          setHeaders: {
            ...this.headers,
            'X-Parse-Session-Token': sessionToken,
          },
        });
      }
    }

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

          if(event.body?.sessionToken){
           console.log('INT', event.body);
           UtilService.setUserData(event.body);
          }
        }
      }),

      catchError((err) => {
        console.log(err);
        if ((err.status = 404)) {
          alert(
            `${this.location.path().split('/').pop()} failed!\n${
              err.error.error
            }`
          );
          //alert(`Error: code-${err.error.code}, ${err.error.error}, general message: ${err.message}, status: ${err.status}  `);
          return EMPTY;
        }

        return [err];
      })
    );

    /*  - - -  */
  }
}

export const appInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};



/* 
HttpErrorResponse {headers: HttpHeaders, status: 404, statusText: 'OK', url: 'https://parseapi.back4app.com/login', ok: false, …}
error: {code: 101, error: 'Invalid username/password.'}
headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
message: "Http failure response for https://parseapi.back4app.com/login: 404 OK"
name: "HttpErrorResponse"
ok: false
status: 404
statusText: "OK"
url: "https://parseapi.back4app.com/login"
[[Prototype]]: HttpResponseBase

*/
