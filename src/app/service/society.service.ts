import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppError } from '../classes/error/app-error';

import { Society } from '../classes/render/Society';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { ApiResponse } from '../classes/io/ApiResponse';
import { Config } from '../classes/common/Config';

@Injectable()
export class SocietyService {

  private reqMap: string = 'society';
  private url: string;

  constructor(private http: Http) {
    if (Config.API_TYPE == 'PHP')
      this.url = Config.API_URL + this.reqMap + '.php?action=';
    else
      this.url = Config.API_URL + this.reqMap + '/';
  }

  getAllSocieties(): Observable<ApiResponse> {
    return this.http.get(this.url + 'get')
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(new AppError(error));
  }
}
