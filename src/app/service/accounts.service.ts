import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppError } from '../classes/error/app-error';
import { BadInputError } from '../classes/error/bad-input';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ApiResponse } from '../classes/io/ApiResponse';
import { NotFoundError } from '../classes/error/not-found-error';

@Injectable()
export class AccountsService {

    private apiResponse: ApiResponse = new ApiResponse();

    private url = 'http://localhost/sms-proxy/accounts.php?action=';

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

    save(id, payload): Observable<ApiResponse> {
        if (id != '') {
            return this.http.put(this.url + 'edit&id=' + id, JSON.stringify(payload))
                .map(response => {
                    let apiResponse: ApiResponse = new ApiResponse();
                    apiResponse.error = response.status;
                    apiResponse.message = response.json()['message'];
                    apiResponse.data = response.json()['data'];
                    return apiResponse;
                })
                .catch(this.handleError);
        } else {
            return this.http.post(this.url + 'save', JSON.stringify(payload))
                .map(response => {
                    let apiResponse: ApiResponse = new ApiResponse();
                    apiResponse.error = response.status;
                    apiResponse.message = response.json()['message'];
                    apiResponse.data = response.json()['data'];
                    return apiResponse;
                })
                .catch(this.handleError);
        }
    }

    getById(id): Observable<ApiResponse> {
        return this.http.get(this.url + 'getById&id=' + id)
            .map(response => {
                let apiResponse: ApiResponse = new ApiResponse();
                apiResponse.error = response.status;
                apiResponse.message = response.json()['message'];
                apiResponse.data = response.json()['data'];
                return apiResponse;
            })
            .catch(this.handleError);
    }


    delete(id): Observable<ApiResponse> {
        return this.http.delete(this.url + 'delete&id=' + id)
            .map(response => {
                let apiResponse: ApiResponse = new ApiResponse();
                apiResponse.error = response.status;
                apiResponse.message = response.json()['message'];
                apiResponse.data = response.json()['data'];
                return apiResponse;
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        if (error.status === 400)
            return Observable.throw(new BadInputError(error));

        return Observable.throw(new AppError(error));
    }
}
