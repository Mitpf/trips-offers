import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { UtilService } from './app-services-utils/util.service';
import {
  environment,
  apiHeaders,
} from 'src/environments/environment.development';
import { Router } from '@angular/router';

@Injectable()
class AppInterceptor implements HttpInterceptor {
constructor(private router:Router){}
  
  hostAPI = '/api';
  private headers = apiHeaders;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.hostAPI)) {
      const sessionToken = UtilService.getUserData()?.sessionToken || '';
      const isBodyData = !!req.body;

      if (!!req.body && req.method.toLowerCase() !== 'get') {
        req = req.clone({
          url: req.url.replace(this.hostAPI, environment.apiUrl),

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
        if (event instanceof HttpResponse && req.url.endsWith('login')) {
         console.log('login post or get',event.body);
         
        }
      })
    )


    /*  - - -  */
  }
}

export const appInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};
