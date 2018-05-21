import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

import { Config } from '../../../class/common/Config';
import { AppError } from '../../../class/error/app-error';
import {StaticFormContent} from "../model/StaticFormContent";
import { ApiResponse } from '../../../class/common/ApiResponse';

@Injectable()
export class StaticFormContentService {

  private reqMap: string = 'enum';
  private url: string;
  public staticFormContent: StaticFormContent = new StaticFormContent();

  constructor(private http: HttpClient) {
    if (Config.API_TYPE == 'PHP') {
      this.url = Config.API_URL + this.reqMap + '.php?action=';
    } else {
      this.url = Config.API_URL + this.reqMap + '/';
    }
  }

  StaticFormContent(): Observable<ApiResponse> {
    return this.http.get(this.url + 'getEnum')
      .map(response => response)
      .catch(this.handleError)
  }

  private handleError(error: Response) {
    return Observable.throw(new AppError(error));
  }
}
