import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ApiResponse } from '../classes/io/ApiResponse';
import { Http } from '@angular/http';

import { NotFoundError } from '../classes/error/not-found-error';
import { BadInputError } from '../classes/error/bad-input';
import { AppError } from '../classes/error/app-error';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CostHeaderService {

    private apiResponse: ApiResponse = new ApiResponse();

    private url = 'http://localhost/sms-service/costHeader.php?action=';

    constructor(private http: Http) { }

    getAll(): Observable<ApiResponse> {
        return this.http.get(this.url + 'getAll')
        .map(response => {
            this.apiResponse.error = response.status;
            this.apiResponse.message = response.json()['message'];
            this.apiResponse.data = response.json()['data'];
            return this.apiResponse;
        })
        .catch(this.handleError);
}

    save(payload): Observable<ApiResponse> {
        if(payload.id) {
            return this.http.put(this.url + 'edit&id=' + payload.id, JSON.stringify(payload))
            .map(response => {
                this.apiResponse.error = response.status;
                this.apiResponse.message = response.json()['message'];
                this.apiResponse.data = response.json()['data'];
                return this.apiResponse;
            })
            .catch(this.handleError);
            } else {
            return this.http.post(this.url + 'save', JSON.stringify(payload))
            .map(response => {
                this.apiResponse.error = response.status;
                this.apiResponse.message = response.json()['message'];
                this.apiResponse.data = response.json()['data'];
                return this.apiResponse;
            })
            .catch(this.handleError);
            }
    }

    getById(id):  Observable<ApiResponse> {
        return this.http.get(this.url + 'getById&id=' + id)
        .map(response => {
            this.apiResponse.error = response.status;
            this.apiResponse.message = response.json()['message'];
            this.apiResponse.data = response.json()['data'];
            return this.apiResponse;
        })
        .catch(this.handleError);
    }


    delete(id):  Observable<ApiResponse> {
        return this.http.delete(this.url + 'delete&id=' + id)
        .map(response => {
            this.apiResponse.error = response.status;
            this.apiResponse.message = response.json()['message'];
            this.apiResponse.data = response.json()['data'];
            return this.apiResponse;
        })
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