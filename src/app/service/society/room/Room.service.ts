import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Config } from '../../../model/common/Config';
import { ApiResponse } from '../../../model/common/ApiResponse';
import { AppError } from '../../../model/error/app-error';

@Injectable()
export class RoomService {

  private reqMap: string = 'room';
  private url: string;

  constructor(private http: HttpClient) {
    if (Config.API_TYPE == 'PHP')
      this.url = Config.API_URL + this.reqMap + '.php?action=';
    else
      this.url = Config.API_URL + this.reqMap + '/';
  }

  getRoomsBySocietyId(id): Observable<ApiResponse> {
    let url: string = '&';
    if (Config.API_TYPE != 'PHP'){
      url = '?';
    }
    return this.http.get(this.url + 'get' + url + 'society=' + id)
    .map(response => response)
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(new AppError(error));
  }
}
