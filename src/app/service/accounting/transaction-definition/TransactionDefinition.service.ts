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

@Injectable()
export class TransactionDefinitionService {

    private transactionDefinition: BehaviorSubject<ApiResponse> = new BehaviorSubject<ApiResponse>(
        {code: null, message: null, data: null}
    );
    transactionDefinitionUpdates = this.transactionDefinition.asObservable();  

    private url = 'http://localhost/sms-proxy/transactionDefinition.php?action=';

    constructor(private http: HttpClient) { }

    getAll(): Observable<ApiResponse> {
        return this.http.get(this.url + 'getAll')
            .map(response => response)
            .catch(this.handleError);
    }

    save(id, payload): Observable<ApiResponse> {
        let hitUrl = 'save';
        this.transactionDefinition.next({code: null, message: null, data: null});
        if (id != 0 || id != '') {
            hitUrl += 'edit&id=' + id;
        }

        return this.http.put(this.url + hitUrl, JSON.stringify(payload))
            .map(response => {
                this.transactionDefinition.next({code: response['code'], message: response['message'], data: response['data']});
                return response;
            })
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