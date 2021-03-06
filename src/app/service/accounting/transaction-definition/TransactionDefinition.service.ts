import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ApiResponse } from '../../../model/common/ApiResponse';
import { AppError } from '../../../model/error/app-error';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TransactionDefinition } from '../../../model/transaction/definition/TransitionDefinition';
import { HttpStatus } from '../../../model/common/HttpStatus';
import { Config } from '../../../model/common/Config';

@Injectable()
export class TransactionDefinitionService {

    private reqMap: string = 'transactionDefinition';
    private url: string;

    private transactionDefinition: BehaviorSubject<ApiResponse> = new BehaviorSubject<ApiResponse>(
        {code: null, message: null, data: null}
    );
    transactionDefinitionUpdates = this.transactionDefinition.asObservable();  

    constructor(private http: HttpClient) {
        if (Config.API_TYPE == 'PHP')
            this.url = Config.API_URL + this.reqMap + '.php?action=';
        else
            this.url = Config.API_URL + this.reqMap + '/';
     }

    getAll(): Observable<ApiResponse> {
        return this.http.get(this.url + 'getAll')
            .map(response => response)
            .catch(this.handleError);
    }

    getById(id): Observable<ApiResponse> {
        return this.http.get(this.url + 'getById&id=' + id)
            .map(response => response)
            .catch(this.handleError);
    }

    save(id, payload): Observable<ApiResponse> {
        this.transactionDefinition.next({code: null, message: null, data: null});
        if (id == 0 || id == '') {
            return this.http.post(this.url + 'save', JSON.stringify(payload))
                .map(response => {
                    this.transactionDefinition.next({code: response['code'], message: response['message'], data: response['data']});
                    return response;
                })
                .catch(this.handleError);
        } else {
            return this.http.put(this.url + 'edit&id='+id, JSON.stringify(payload))
                .map(response => {
                    this.transactionDefinition.next({code: response['code'], message: response['message'], data: response['data']});
                    return response;
                })
                .catch(this.handleError);
        }
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