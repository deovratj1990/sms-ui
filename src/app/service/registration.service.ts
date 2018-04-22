import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiResponse } from '../classes/io/ApiResponse';

import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {

  //private url: string = 'http://192.168.0.3/';
  private url: string = 'http://localhost/sms-service/registration.php?action=';

  constructor(private http: Http) { }

  registration(payload): Observable<ApiResponse> {
    return this.http.post(this.url + 'registration', JSON.stringify(payload))
      .map(response => response.json())
  }
}
