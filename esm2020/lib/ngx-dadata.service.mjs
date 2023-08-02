import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export var DadataType;
(function (DadataType) {
    DadataType["fio"] = "fio";
    DadataType["address"] = "address";
    DadataType["party"] = "party";
    DadataType["bank"] = "bank";
    DadataType["email"] = "email";
})(DadataType || (DadataType = {}));
export class NgxDadataService {
    constructor(http) {
        this.http = http;
        this.apiKey = '';
    }
    setApiKey(key) {
        this.apiKey = key;
    }
    // eslint-disable-next-line max-len
    getData(value, type = DadataType.address, config) {
        const httpOptions = {
            headers: new HttpHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + this.apiKey,
            })
        };
        const body = Object.assign({}, { query: value }, { count: config?.limit }, { locations: config?.locations }, { location_boost: config?.locationsBoost }, { from_bound: config?.bounds?.fromBound }, { to_bound: config?.bounds?.toBound }, { to_bound: config?.bounds?.toBound }, { restrict_value: config?.restrictValue });
        return this.http.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/' + type, body, httpOptions);
    }
}
NgxDadataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDadataService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
NgxDadataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDadataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDadataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRhZGF0YS9zcmMvbGliL25neC1kYWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSzdELE1BQU0sQ0FBTixJQUFZLFVBTVg7QUFORCxXQUFZLFVBQVU7SUFDcEIseUJBQVcsQ0FBQTtJQUNYLGlDQUFtQixDQUFBO0lBQ25CLDZCQUFlLENBQUE7SUFDZiwyQkFBYSxDQUFBO0lBQ2IsNkJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBTlcsVUFBVSxLQUFWLFVBQVUsUUFNckI7QUFLRCxNQUFNLE9BQU8sZ0JBQWdCO0lBRzNCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGcEMsV0FBTSxHQUFHLEVBQUUsQ0FBQztJQUdaLENBQUM7SUFFRCxTQUFTLENBQUMsR0FBVztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRUQsbUNBQW1DO0lBQ25DLE9BQU8sQ0FBQyxLQUFhLEVBQUUsT0FBbUIsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFvQjtRQUNoRixNQUFNLFdBQVcsR0FBRztZQUNsQixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUM7Z0JBQ3ZCLE1BQU0sRUFBRSxrQkFBa0I7Z0JBQzFCLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLGFBQWEsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU07YUFDdEMsQ0FBQztTQUNILENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN4QixFQUFFLEVBQ0YsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLEVBQ2QsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxFQUN0QixFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLEVBQzlCLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUMsRUFDeEMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsRUFDdkMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUMsRUFDbkMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUMsRUFDbkMsRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBQyxDQUN4QyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBaUIsK0RBQStELEdBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNuSSxDQUFDOzs2R0EvQlUsZ0JBQWdCO2lIQUFoQixnQkFBZ0IsY0FGZixNQUFNOzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBIZWFkZXJzfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7RGFkYXRhUmVzcG9uc2V9IGZyb20gJy4vbW9kZWxzL2RhZGF0YS1yZXNwb25zZSc7XHJcbmltcG9ydCB7Qm91bmRzLCBEYWRhdGFDb25maWcsIExvY2F0aW9ufSBmcm9tICcuL2RhZGF0YS1jb25maWcnO1xyXG5cclxuZXhwb3J0IGVudW0gRGFkYXRhVHlwZSB7XHJcbiAgZmlvID0gJ2ZpbycsXHJcbiAgYWRkcmVzcyA9ICdhZGRyZXNzJyxcclxuICBwYXJ0eSA9ICdwYXJ0eScsXHJcbiAgYmFuayA9ICdiYW5rJyxcclxuICBlbWFpbCA9ICdlbWFpbCdcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4RGFkYXRhU2VydmljZSB7XHJcbiAgYXBpS2V5ID0gJyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gIH1cclxuXHJcbiAgc2V0QXBpS2V5KGtleTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFwaUtleSA9IGtleTtcclxuICB9XHJcblxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXHJcbiAgZ2V0RGF0YSh2YWx1ZTogc3RyaW5nLCB0eXBlOiBEYWRhdGFUeXBlID0gRGFkYXRhVHlwZS5hZGRyZXNzLCBjb25maWc6IERhZGF0YUNvbmZpZyk6IE9ic2VydmFibGU8RGFkYXRhUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xyXG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgQXV0aG9yaXphdGlvbjogJ1Rva2VuICcgKyB0aGlzLmFwaUtleSxcclxuICAgICAgfSlcclxuICAgIH07XHJcbiAgICBjb25zdCBib2R5ID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHtxdWVyeTogdmFsdWV9LFxyXG4gICAgICB7Y291bnQ6IGNvbmZpZz8ubGltaXR9LFxyXG4gICAgICB7bG9jYXRpb25zOiBjb25maWc/LmxvY2F0aW9uc30sXHJcbiAgICAgIHtsb2NhdGlvbl9ib29zdDogY29uZmlnPy5sb2NhdGlvbnNCb29zdH0sXHJcbiAgICAgIHtmcm9tX2JvdW5kOiBjb25maWc/LmJvdW5kcz8uZnJvbUJvdW5kfSxcclxuICAgICAge3RvX2JvdW5kOiBjb25maWc/LmJvdW5kcz8udG9Cb3VuZH0sXHJcbiAgICAgIHt0b19ib3VuZDogY29uZmlnPy5ib3VuZHM/LnRvQm91bmR9LFxyXG4gICAgICB7cmVzdHJpY3RfdmFsdWU6IGNvbmZpZz8ucmVzdHJpY3RWYWx1ZX1cclxuICAgICk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8RGFkYXRhUmVzcG9uc2U+KCdodHRwczovL3N1Z2dlc3Rpb25zLmRhZGF0YS5ydS9zdWdnZXN0aW9ucy9hcGkvNF8xL3JzL3N1Z2dlc3QvJyArIHR5cGUsIGJvZHksIGh0dHBPcHRpb25zKTtcclxuICB9XHJcbn1cclxuIl19