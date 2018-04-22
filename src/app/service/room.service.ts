import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { AppError } from '../classes/error/app-error';
import { NotFoundError } from '../classes/error/not-found-error';
import { BadInputError } from '../classes/error/bad-input';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Room } from '../classes/render/Room';

@Injectable()
export class RoomService {

  private url: string = 'http://localhost/sms-service/room.php?action=';

  constructor(private http: Http) { }

  getRoomsBySocietyId(id): Observable<Room[]> {
    return this.http.get(this.url + 'getRoomsBySocietyId&societyId=' + id)
      .map(response => response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: Response) {

    if (error.status === 0 || error.status === 404) {
      return Observable.throw(new NotFoundError(error));
    }

    if (error.status === 400) {
      return Observable.throw(new BadInputError(error));
    }

    return Observable.throw(new AppError(error));

  }

}
