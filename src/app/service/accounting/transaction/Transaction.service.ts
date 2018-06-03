import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "../../../model/common/ApiResponse";

import { Observable } from 'rxjs';
import { Config } from "../../../model/common/Config";
import { AppError } from "../../../model/error/app-error";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TransactionService {

    private reqMap: string = 'transaction';
    private url: string;

    constructor(private http: HttpClient) {
        if (Config.API_TYPE == 'PHP')
            this.url = Config.API_URL + this.reqMap + '.php?action=';
        else
            this.url = Config.API_URL + this.reqMap + '/';
    }

    getByTransactionDefinitionId(id): Observable<ApiResponse> {
        return this.http.get(this.url + 'getByTransactionDefinitionId&id='+id)
            .map(response => response)
            .catch(this.handleError);
    }

    save(payload): Observable<ApiResponse> {
        return this.http.get(this.url + 'save')
            .map(response => response)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(new AppError(error));
    }

}