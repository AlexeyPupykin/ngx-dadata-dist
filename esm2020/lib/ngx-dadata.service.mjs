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
        const body = Object.assign({}, { query: value }, { count: config?.limit }, { locations: config?.locations }, { location_boost: config?.locationsBoost }, { from_bound: config?.bounds?.fromBound }, { to_bound: config?.bounds?.toBound });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWRhZGF0YS9zcmMvbGliL25neC1kYWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxXQUFXLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7O0FBSzdELE1BQU0sQ0FBTixJQUFZLFVBTVg7QUFORCxXQUFZLFVBQVU7SUFDcEIseUJBQVcsQ0FBQTtJQUNYLGlDQUFtQixDQUFBO0lBQ25CLDZCQUFlLENBQUE7SUFDZiwyQkFBYSxDQUFBO0lBQ2IsNkJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBTlcsVUFBVSxLQUFWLFVBQVUsUUFNckI7QUFLRCxNQUFNLE9BQU8sZ0JBQWdCO0lBRzNCLFlBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFGcEMsV0FBTSxHQUFHLEVBQUUsQ0FBQztJQUdaLENBQUM7SUFFRCxTQUFTLENBQUMsR0FBVztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRUQsbUNBQW1DO0lBQ25DLE9BQU8sQ0FBQyxLQUFhLEVBQUUsT0FBbUIsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFvQjtRQUNoRixNQUFNLFdBQVcsR0FBRztZQUNsQixPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUM7Z0JBQ3ZCLE1BQU0sRUFBRSxrQkFBa0I7Z0JBQzFCLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLGFBQWEsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU07YUFDdEMsQ0FBQztTQUNILENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN4QixFQUFFLEVBQ0YsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLEVBQ2QsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQyxFQUN0QixFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLEVBQzlCLEVBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUMsRUFDeEMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsRUFDdkMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUMsQ0FDcEMsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQWlCLCtEQUErRCxHQUFHLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbkksQ0FBQzs7NkdBN0JVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCLGNBRmYsTUFBTTsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwSGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge0RhZGF0YVJlc3BvbnNlfSBmcm9tICcuL21vZGVscy9kYWRhdGEtcmVzcG9uc2UnO1xyXG5pbXBvcnQge0JvdW5kcywgRGFkYXRhQ29uZmlnLCBMb2NhdGlvbn0gZnJvbSAnLi9kYWRhdGEtY29uZmlnJztcclxuXHJcbmV4cG9ydCBlbnVtIERhZGF0YVR5cGUge1xyXG4gIGZpbyA9ICdmaW8nLFxyXG4gIGFkZHJlc3MgPSAnYWRkcmVzcycsXHJcbiAgcGFydHkgPSAncGFydHknLFxyXG4gIGJhbmsgPSAnYmFuaycsXHJcbiAgZW1haWwgPSAnZW1haWwnXHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neERhZGF0YVNlcnZpY2Uge1xyXG4gIGFwaUtleSA9ICcnO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHtcclxuICB9XHJcblxyXG4gIHNldEFwaUtleShrZXk6IHN0cmluZykge1xyXG4gICAgdGhpcy5hcGlLZXkgPSBrZXk7XHJcbiAgfVxyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxyXG4gIGdldERhdGEodmFsdWU6IHN0cmluZywgdHlwZTogRGFkYXRhVHlwZSA9IERhZGF0YVR5cGUuYWRkcmVzcywgY29uZmlnOiBEYWRhdGFDb25maWcpOiBPYnNlcnZhYmxlPERhZGF0YVJlc3BvbnNlPiB7XHJcbiAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcclxuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIEF1dGhvcml6YXRpb246ICdUb2tlbiAnICsgdGhpcy5hcGlLZXksXHJcbiAgICAgIH0pXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYm9keSA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHt9LFxyXG4gICAgICB7cXVlcnk6IHZhbHVlfSxcclxuICAgICAge2NvdW50OiBjb25maWc/LmxpbWl0fSxcclxuICAgICAge2xvY2F0aW9uczogY29uZmlnPy5sb2NhdGlvbnN9LFxyXG4gICAgICB7bG9jYXRpb25fYm9vc3Q6IGNvbmZpZz8ubG9jYXRpb25zQm9vc3R9LFxyXG4gICAgICB7ZnJvbV9ib3VuZDogY29uZmlnPy5ib3VuZHM/LmZyb21Cb3VuZH0sXHJcbiAgICAgIHt0b19ib3VuZDogY29uZmlnPy5ib3VuZHM/LnRvQm91bmR9XHJcbiAgICApO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PERhZGF0YVJlc3BvbnNlPignaHR0cHM6Ly9zdWdnZXN0aW9ucy5kYWRhdGEucnUvc3VnZ2VzdGlvbnMvYXBpLzRfMS9ycy9zdWdnZXN0LycgKyB0eXBlLCBib2R5LCBodHRwT3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==