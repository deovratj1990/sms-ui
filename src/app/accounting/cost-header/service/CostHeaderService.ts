import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ApiResponse } from '../../../class/common/ApiResponse';
import { AppError } from '../../../class/error/app-error';

@Injectable()
export class CostHeaderService {

    private apiResponse: ApiResponse = new ApiResponse();

    private url = 'http://localhost/sms-proxy/costHeader.php?action=';

    constructor(private http: HttpClient) { }

    getAll(): Observable<ApiResponse> {
        return this.http.get(this.url + 'getAll')
            .map(response => response)
            .catch(this.handleError);
    }

    save(id, payload): Observable<ApiResponse> {
        let hitUrl = 'save';
        if (id != 0 || id != '') {
            hitUrl += '&id=' + id;
        }
        
        return this.http.post(this.url + hitUrl, JSON.stringify(payload))
        .map(response => response)
        .catch(this.handleError);
}

    getById(id): Observable<ApiResponse> {
        return this.http.get(this.url + 'getById&id=' + id)
            .map(response => response)
            .catch(this.handleError);
    }


    delete(id): Observable<ApiResponse> {
        return this.http.delete(this.url + 'delete&id=' + id)
            .map(response => response)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(new AppError(error));
    }

}