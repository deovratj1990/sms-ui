import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../model/common/Config';

@Injectable()
export class RequestInteceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let setHeaders: any;
    if(Config.API_TYPE === 'PHP') {
      setHeaders = {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'};
    } else {
      setHeaders = {'Content-Type' : 'application/json;charset=UTF-8'};
    }
    
    request = request.clone({
      setHeaders: setHeaders
    });
    return next.handle(request);
  }
}