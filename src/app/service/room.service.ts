import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { AppError } from '../classes/error/app-error';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Room } from '../classes/render/Room';
import { ApiResponse } from '../classes/io/ApiResponse';
import { Config } from '../classes/common/Config';

@Injectable()
export class RoomService {

  private reqMap: string = 'room';
  private url: string;

  constructor(private http: Http) {
    if (Config.API_TYPE == 'PHP')
      this.url = Config.API_URL + this.reqMap + '.php?action=';
    else
      this.url = Config.API_URL + this.reqMap + '/';
  }

  getRoomsBySocietyId(id): Observable<ApiResponse> {
    return this.http.get(this.url + 'get&society=' + id)
    .map(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(new AppError(error));
  }
}
