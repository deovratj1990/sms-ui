import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ApiResponse } from '../../../../class/common/ApiResponse';
import { AppError } from '../../../../class/error/app-error';

@Injectable()
export class TransactionDefinitionService {

    private apiResponse: ApiResponse = new ApiResponse();
    private urlTransactionDefinition = 'http://localhost/sms-proxy/transactionDefinition.php?action=';
    private urlCostHeader = 'http://localhost/sms-proxy/costHeader.php?action=';

    constructor(private http: Http) { }

    getTransactionType(): Observable<ApiResponse> {
        return this.http.get(this.urlTransactionDefinition + 'getType')
            .map(response => response.json())
            .catch(this.handleError);
    }

    getInterval(): Observable<ApiResponse> {
        return this.http.get(this.urlTransactionDefinition + 'getInterval')
            .map(response => response.json())
            .catch(this.handleError);
    }

    getAll(): Observable<ApiResponse> {
        return this.http.get(this.urlTransactionDefinition + 'getAll')
            .map(response => response.json())
            .catch(this.handleError);
    }

    save(payload): Observable<ApiResponse> {
        if (payload.id) {
            return this.http.put(this.urlTransactionDefinition + 'edit&id=' + payload.id, JSON.stringify(payload))
                .map(response => response.json())
                .catch(this.handleError);
        } else {
            return this.http.post(this.urlTransactionDefinition + 'save', JSON.stringify(payload))
                .map(response => response.json())
                .catch(this.handleError);
        }
    }

    getById(id): Observable<ApiResponse> {
        return this.http.get(this.urlTransactionDefinition + 'getById&id=' + id)
            .map(response => response.json())
            .catch(this.handleError);
    }


    delete(id): Observable<ApiResponse> {
        return this.http.delete(this.urlTransactionDefinition + 'delete&id=' + id)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(new AppError(error));
    }

}