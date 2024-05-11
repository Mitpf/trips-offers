import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from '../error-messages-module/error.service';
import { UtilService } from '../app-services-utils/util.service';
import { GlobalLoaderService } from '../globals/global-loader/global-loader.service';

@Injectable({
  providedIn: 'root',
})
export class RequestHandlerService {
  constructor(
    private next: HttpHandler,
    private errService: ErrorService,
    private globLoaderService: GlobalLoaderService
  ) {}

  handler(
    req: HttpRequest<any>,
    hostApi: string,
    apiUrl: string,
    headers: object
  ): HttpRequest<any> {
    //clean old errors
    this.errService.setError([]);
    let modifiedReq = req.clone();
     

    if (req.url.startsWith(hostApi)) {
      this.globLoaderService.setIsLoading();
      const sessionToken = UtilService.getUserData()?.sessionToken || '';
      const isBodyData = !!req.body;

      if (isBodyData && req.method.toLowerCase() !== 'get') {
        modifiedReq = modifiedReq.clone({
          url: modifiedReq.url.replace(hostApi, apiUrl),
          // #NO CRED. withCredentials: true,
          setHeaders: {
            ...headers,
            'X-Parse-Session-Token': sessionToken,
            'Content-Type': 'application/json',
          },
        });
      } else {
        modifiedReq = modifiedReq.clone({
          url: modifiedReq.url.replace(hostApi, apiUrl),

          setHeaders: {
            ...headers,
            'X-Parse-Session-Token': sessionToken,
          },
        });
      }
    }

    return modifiedReq;
  }
}
