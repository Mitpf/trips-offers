import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { UtilService } from '../app-services-utils/util.service';
import {
  environment,
  apiHeaders,
} from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ErrorService } from '../error-messages-module/error.service';
import { RequestHandlerService } from './request-handler.service';

@Injectable()
class AppInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private location: Location,
    private errService: ErrorService,
    private reqService: RequestHandlerService
  ) {}

  hostAPI = '/api';
  private headers = apiHeaders;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    const modifiedReq = this.reqService.handler(
      req,
      this.hostAPI,
      environment.apiUrl,
      this.headers
    );

    /* -- */

    return next.handle(modifiedReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.body?.sessionToken) {
            console.log('INT', event.body);
            UtilService.setUserData(event.body);
          }
        }
      }),

      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errService.setError(err);
          // this.router.navigate(['/error']);
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


