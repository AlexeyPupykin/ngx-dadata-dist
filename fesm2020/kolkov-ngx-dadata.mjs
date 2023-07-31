import * as i0 from '@angular/core';
import { Injectable, EventEmitter, forwardRef, Component, Inject, Input, Output, ViewChild, HostListener, NgModule } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import * as i3 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { unwrapHtmlForSink } from 'safevalues';
import { createHtml } from 'safevalues/implementation/html_impl';

var DadataType;
(function (DadataType) {
    DadataType["fio"] = "fio";
    DadataType["address"] = "address";
    DadataType["party"] = "party";
    DadataType["bank"] = "bank";
    DadataType["email"] = "email";
})(DadataType || (DadataType = {}));
class NgxDadataService {
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
        console.log(body);
        return this.http.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/' + type, body, httpOptions);
    }
}
NgxDadataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
NgxDadataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });

const DadataConfigDefault = {
    apiKey: '',
    type: DadataType.address,
    delay: 500,
    limit: 10,
    width: 'auto',
    minWidth: '0',
    partyAddress: 'city',
    locations: null,
};

/*const NGX_DADATA_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NgxDadataComponent),
  multi: true,
};*/
function createDaDataValidator(value) {
    return (c) => {
        const err = {
            rangeError: {
                given: c.value,
                expected: value,
            }
        };
        return (c.value !== value) ? err : null;
    };
}
/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let uniqueDadataIdCounter = 0;
class NgxDadataComponent {
    constructor(dataService, r, elRef, document) {
        this.dataService = dataService;
        this.r = r;
        this.elRef = elRef;
        this.document = document;
        this.v = '';
        this.currentFocus = -1;
        this.opened = false;
        this.data = [];
        this.config = DadataConfigDefault;
        this.disabled = null;
        this.type = DadataType.address;
        this.limit = DadataConfigDefault.limit;
        this.placeholder = '';
        this.locations = null;
        this.selected = new EventEmitter();
        this.inputString$ = new Subject();
        /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
        this.id = `ngx-dadata-${uniqueDadataIdCounter++}`;
        // onSuggestionSelected = (value: string) => {};
        this.onTouched = () => { };
        this.propagateChange = () => { };
        this.validateFn = () => { };
    }
    get value() {
        return this.v;
    }
    set value(v) {
        if (v !== this.v) {
            this.v = v;
            this.propagateChange(v);
        }
    }
    ngOnInit() {
        /*this.validateFn = createDaDataValidator(this._value);
        this.propagateChange(this._value);*/
        this.type = this.config.type;
        this.locations = this.config.locations;
        this.dataService.setApiKey(this.apiKey ? this.apiKey : this.config.apiKey);
        this.inputString$.pipe(debounce(() => timer(this.config.delay ? this.config.delay : 500))).subscribe(x => {
            this.dataService.getData(x, this.type, this.config)
                .subscribe((y) => {
                this.data = y.suggestions;
                if (this.data.length) {
                    this.opened = true;
                }
            });
        });
    }
    ngOnChanges(changes) {
        if (changes.value) {
            // console.log('ngOnChanges');
        }
    }
    getData(value) {
        this.inputString$.next(value);
        this.currentFocus = -1;
    }
    onClick(e, item) {
        this.inputValue.nativeElement.value = item.value;
        this.propagateChange(item.value);
        this.inputValue.nativeElement.focus();
        this.selectedSuggestion = item;
        this.data = [];
        this.currentFocus = -1;
        this.opened = false;
        this.selected.emit(item);
        // this.selectedData.emit(item.data);
        // this.selectedString.emit(item.value);
    }
    onOutsideClick($event) {
        if (!this.opened) {
            return;
        }
        if (!this.elRef.nativeElement.contains($event.target)) {
            this.data = [];
            this.opened = false;
        }
    }
    onArrowDown() {
        this.removeFocus(this.currentFocus);
        if (this.currentFocus >= this.data.length - 1) {
            this.currentFocus = 0;
        }
        else {
            this.currentFocus++;
        }
        this.setFocus(this.currentFocus);
    }
    onArrowUp() {
        this.removeFocus(this.currentFocus);
        if (this.currentFocus === 0) {
            this.currentFocus = this.data.length - 1;
        }
        else {
            this.currentFocus--;
        }
        this.setFocus(this.currentFocus);
    }
    onEnter(event) {
        this.selectedSuggestion = this.data[this.currentFocus];
        this.inputValue.nativeElement.value = this.selectedSuggestion.value;
        this.data = [];
        this.currentFocus = -1;
        this.propagateChange(this.selectedSuggestion.value);
        this.selected.emit(this.selectedSuggestion);
        // this.selectedData.emit(this.selectedSuggestion.data);
        // this.selectedString.emit(this.selectedSuggestion.value);
    }
    setFocus(id) {
        const activeEl = this.document.getElementById(id + 'item');
        this.r.addClass(activeEl, 'active');
    }
    removeFocus(id) {
        if (id !== -1) {
            const activeEl = this.document.getElementById(id + 'item');
            this.r.removeClass(activeEl, 'active');
        }
    }
    writeValue(value) {
        if (value !== undefined && value !== null) {
            this.v = value;
        }
        else {
            this.v = '';
        }
        this.r.setProperty(this.inputValue.nativeElement, 'innerHTML', unwrapHtmlForSink(createHtml(this.v)));
    }
    /**
     * Set the function to be called
     * when the control receives a change event.
     *
     * @param fn a function
     */
    registerOnChange(fn) {
        // this.onSuggestionSelected = fn;
        this.propagateChange = fn;
    }
    /**
     * Set the function to be called
     * when the control receives a touch event.
     *
     * @param fn a function
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Implements disabled state for this element
     *
     * @param isDisabled Disabled state flag
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
NgxDadataComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataComponent, deps: [{ token: NgxDadataService }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
NgxDadataComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.3", type: NgxDadataComponent, selector: "ngx-dadata", inputs: { config: "config", apiKey: "apiKey", disabled: "disabled", type: "type", limit: "limit", placeholder: "placeholder", locations: "locations" }, outputs: { selectedSuggestion: "selectedSuggestion", selected: "selected" }, host: { listeners: { "document:click": "onOutsideClick($event)" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxDadataComponent),
            multi: true
        }, /*NGX_DADATA_VALIDATOR*/
    ], viewQueries: [{ propertyName: "inputValue", first: true, predicate: ["inputValue"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"autocomplete\">\r\n  <input [disabled]=\"disabled  ? true : null\" type=\"text\" class=\"search\" #inputValue (input)=\"getData(inputValue.value)\"\r\n         [placeholder]=\"placeholder\" (keyup.ArrowDown)=\"onArrowDown()\" (keyup.ArrowUp)=\"onArrowUp()\"\r\n         (keyup.Enter)=\"onEnter($event)\" spellcheck=\"false\" [(ngModel)]=\"value\" autocomplete=\"off\" />\r\n  <div *ngIf=\"data.length\">\r\n    <div class=\"autocomplete-items\">\r\n      <div class=\"autocomplele-item\" *ngFor=\"let item of data; let i = index\" (click)=\"onClick($event, item)\" [id]=\"i+'item'\">\r\n        {{item.value}}\r\n        <ng-template [ngIf]=\"type==='party'\">\r\n          <br/>\r\n          <span>{{item.data?.inn}} {{config.partyAddress === 'full' ? item.data?.address?.value : item.data?.address?.data?.city}}</span>\r\n        </ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".autocomplete{position:relative}input{border:0 solid transparent;background-color:#f1f1f1;padding:5px}input[type=text]{background-color:#f1f1f1;width:100%}input[type=submit]{background-color:#1e90ff;color:#fff}.autocomplete-items{position:absolute;border:1px solid #d4d4d4;border-bottom:none;border-top:none;z-index:99;top:100%;left:0;right:0}.autocomplete-items .autocomplele-item{padding:5px 10px;cursor:pointer;background-color:#fff;border-bottom:1px solid #d4d4d4}.autocomplete-items .autocomplele-item:hover{background-color:#e9e9e9}.autocomplete-items .autocomplele-item.active{background-color:#1e90ff!important;color:#fff}.autocomplete-items .autocomplele-item span{color:#555;font-size:80%}\n"], directives: [{ type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-dadata', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxDadataComponent),
                            multi: true
                        }, /*NGX_DADATA_VALIDATOR*/
                    ], template: "<div class=\"autocomplete\">\r\n  <input [disabled]=\"disabled  ? true : null\" type=\"text\" class=\"search\" #inputValue (input)=\"getData(inputValue.value)\"\r\n         [placeholder]=\"placeholder\" (keyup.ArrowDown)=\"onArrowDown()\" (keyup.ArrowUp)=\"onArrowUp()\"\r\n         (keyup.Enter)=\"onEnter($event)\" spellcheck=\"false\" [(ngModel)]=\"value\" autocomplete=\"off\" />\r\n  <div *ngIf=\"data.length\">\r\n    <div class=\"autocomplete-items\">\r\n      <div class=\"autocomplele-item\" *ngFor=\"let item of data; let i = index\" (click)=\"onClick($event, item)\" [id]=\"i+'item'\">\r\n        {{item.value}}\r\n        <ng-template [ngIf]=\"type==='party'\">\r\n          <br/>\r\n          <span>{{item.data?.inn}} {{config.partyAddress === 'full' ? item.data?.address?.value : item.data?.address?.data?.city}}</span>\r\n        </ng-template>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".autocomplete{position:relative}input{border:0 solid transparent;background-color:#f1f1f1;padding:5px}input[type=text]{background-color:#f1f1f1;width:100%}input[type=submit]{background-color:#1e90ff;color:#fff}.autocomplete-items{position:absolute;border:1px solid #d4d4d4;border-bottom:none;border-top:none;z-index:99;top:100%;left:0;right:0}.autocomplete-items .autocomplele-item{padding:5px 10px;cursor:pointer;background-color:#fff;border-bottom:1px solid #d4d4d4}.autocomplete-items .autocomplele-item:hover{background-color:#e9e9e9}.autocomplete-items .autocomplele-item.active{background-color:#1e90ff!important;color:#fff}.autocomplete-items .autocomplele-item span{color:#555;font-size:80%}\n"] }]
        }], ctorParameters: function () { return [{ type: NgxDadataService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { config: [{
                type: Input
            }], apiKey: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], limit: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], locations: [{
                type: Input
            }], selectedSuggestion: [{
                type: Output
            }], selected: [{
                type: Output
            }], inputValue: [{
                type: ViewChild,
                args: ['inputValue', { static: true }]
            }], onOutsideClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

class NgxDadataModule {
}
NgxDadataModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxDadataModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataModule, declarations: [NgxDadataComponent], imports: [CommonModule,
        FormsModule], exports: [NgxDadataComponent] });
NgxDadataModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataModule, imports: [[
            CommonModule,
            FormsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [NgxDadataComponent],
                    exports: [NgxDadataComponent]
                }]
        }] });

/*
 * Public API Surface of ngx-dadata
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DadataConfigDefault, DadataType, NgxDadataComponent, NgxDadataModule, NgxDadataService, createDaDataValidator };
//# sourceMappingURL=kolkov-ngx-dadata.mjs.map
