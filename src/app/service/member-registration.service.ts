import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiResponse } from '../classes/io/ApiResponse';

import { AppError } from '../classes/error/app-error';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Config } from '../classes/common/Config';

@Injectable()
export class MemberRegistrationService {

  private reqMap: string = 'user';
  private url: string;
  private options = new RequestOptions();

  constructor(private http: Http) {
    if (Config.API_TYPE == 'PHP')
      this.url = Config.API_URL + this.reqMap + '.php?action=';
    else
      this.url = Config.API_URL + this.reqMap + '/';

    this.options.headers = new Headers();
    this.options.headers.append('content-type', "application/json");

  }

  registration(payload): Observable<ApiResponse> {
    return this.http.post(this.url + 'register', JSON.stringify(payload))//, this.options)
      .map(response => response.json())
      .catch(this.handleError)
  }

  private handleError(error: Response) {
    return Observable.throw(new AppError(error));
  }
}
