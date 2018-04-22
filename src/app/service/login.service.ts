import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AppError } from '../classes/error/app-error';
import { NotFoundError } from '../classes/error/not-found-error';
import { BadInputError } from '../classes/error/bad-input';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {

  //private url: string = 'http://192.168.0.3/';
  private url: string = 'http://localhost/sms-service/login.php?action=';

  constructor(
    private http: Http,
    private router: Router
  ) { }

  login(payload) {
    return this.http.post(this.url + 'login', JSON.stringify(payload))
      .map(response => response)
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
    if(error.status === 0 || error.status === 404) {
      return Observable.throw(new NotFoundError(error));
    }

    if(error.status === 400) {
      return Observable.throw(new BadInputError(error));
    }

    return Observable.throw(new AppError(error));
  }

}
