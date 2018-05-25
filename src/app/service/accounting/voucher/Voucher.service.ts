import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class VoucherService {
    constructor(private http: HttpClient) { }
}