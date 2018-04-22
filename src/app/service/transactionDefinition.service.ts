import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { TransactionDefinition } from '../classes/render/TransactionDefinition';

import { NotFoundError } from '../classes/error/not-found-error';
import { BadInputError } from '../classes/error/bad-input';
import { AppError } from '../classes/error/app-error';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TransactionType } from '../classes/render/TransactionType';

@Injectable()
export class TransactionDefinitionService {

    private url = 'http://localhost/sms-service/transactionDefinition.php?action=';

    constructor(private http: Http) { }
    
    getTransactionType(): Observable<TransactionType[]> {
        return this.http.get(this.url + 'getType')
        .map(response => response.json()['data'])
        .catch(this.handleError);
    }

    getAll(): Observable<TransactionDefinition[]> {
        return this.http.get(this.url + 'getAll')
        .map(response => response.json()['data'])
        .catch(this.handleError);
    }

    save(payload): Observable<TransactionDefinition> {
        if(payload.id) {
            return this.http.put(this.url + 'edit&id=' + payload.id, JSON.stringify(payload))
            .map(response => response.json()['data'])
            .catch(this.handleError);
        } else {
            return this.http.post(this.url + 'save', JSON.stringify(payload))
            .map(response => response.json()['data'])
            .catch(this.handleError);
        }
    }

    getById(id):  Observable<TransactionDefinition> {
        return this.http.get(this.url + 'getById&id=' + id)
            .map(response => response.json()['data'])
            .catch(this.handleError);
    }


    delete(id):  Observable<any> {
        return this.http.delete(this.url + 'delete&id=' + id)
            .map(response => response.status)
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