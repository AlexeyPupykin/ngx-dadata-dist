import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DadataResponse } from './models/dadata-response';
import { DadataConfig } from './dadata-config';
import * as i0 from "@angular/core";
export declare enum DadataType {
    fio = "fio",
    address = "address",
    party = "party",
    bank = "bank",
    email = "email"
}
export declare class NgxDadataService {
    private http;
    apiKey: string;
    constructor(http: HttpClient);
    setApiKey(key: string): void;
    getData(value: string, type: DadataType, config: DadataConfig): Observable<DadataResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxDadataService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxDadataService>;
}
