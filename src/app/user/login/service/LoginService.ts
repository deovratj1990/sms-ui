import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import { Config } from '../../../class/common/Config';
import { ApiResponse } from '../../../class/common/ApiResponse';
import { AppError } from '../../../class/error/app-error';

@Injectable()
export class LoginService {

  private reqMap: string = 'user';
  private url: string;

  constructor(private http: Http, private router: Router) {
    if (Config.API_TYPE == 'PHP')
      this.url = Config.API_URL + this.reqMap + '.php?action=';
    else
      this.url = Config.API_URL + this.reqMap + '/';
  }

  login(payload): Observable<ApiResponse> {
    return this.http.post(this.url + 'login', JSON.stringify(payload))
    .map(response => response.json())
    .catch(this.handleError);
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if(!token) return null;
    return new JwtHelper().decodeToken(token);    
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private handleError(error: Response) {
    return Observable.throw(new AppError(error));
  }

}
