import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Config } from '../../class/common/Config';
import { ApiResponse } from '../../class/common/ApiResponse';
import { AppError } from '../../class/error/app-error';

@Injectable()
export class SocietyService {

  private reqMap: string = 'society';
  private url: string;

  constructor(private http: HttpClient) {
    if (Config.API_TYPE == 'PHP')
      this.url = Config.API_URL + this.reqMap + '.php?action=';
    else
      this.url = Config.API_URL + this.reqMap + '/';
  }

  getAllSocieties(): Observable<ApiResponse> {
    return this.http.get(this.url + 'get')
      .map(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(new AppError(error));
  }
}
