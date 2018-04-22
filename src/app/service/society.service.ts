import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppError } from '../classes/error/app-error';
import { NotFoundError } from '../classes/error/not-found-error';
import { BadInputError } from '../classes/error/bad-input';

import { Society } from '../classes/render/Society';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class SocietyService {

  private url: string = 'http://localhost/sms-service/society.php?action=';

  constructor(private http: Http) { }

  getSocieties(): Observable<Society[]> {
    return this.http.get(this.url + 'getSocieties')
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
