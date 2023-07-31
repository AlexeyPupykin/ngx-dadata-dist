import { Component, EventEmitter, forwardRef, HostListener, Inject, Input, Output, ViewChild } from '@angular/core';
import { DadataType } from './ngx-dadata.service';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { DadataConfigDefault } from './dadata-config';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { unwrapHtmlForSink } from 'safevalues';
import { createHtml } from 'safevalues/implementation/html_impl';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-dadata.service";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/common";
/*const NGX_DADATA_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NgxDadataComponent),
  multi: true,
};*/
export function createDaDataValidator(value) {
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
export class NgxDadataComponent {
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
NgxDadataComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.3", ngImport: i0, type: NgxDadataComponent, deps: [{ token: i1.NgxDadataService }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.NgxDadataService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: Document, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhZGF0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZGFkYXRhL3NyYy9saWIvbmd4LWRhZGF0YS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZGFkYXRhL3NyYy9saWIvbmd4LWRhZGF0YS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUFFLE1BQU0sRUFDcEIsS0FBSyxFQUdMLE1BQU0sRUFHTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFVBQVUsRUFBbUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRSxPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEMsT0FBTyxFQUFlLG1CQUFtQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFtRCxpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25HLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDOzs7OztBQUUvRDs7OztJQUlJO0FBRUosTUFBTSxVQUFVLHFCQUFxQixDQUFDLEtBQUs7SUFDekMsT0FBTyxDQUFDLENBQWMsRUFBRSxFQUFFO1FBQ3hCLE1BQU0sR0FBRyxHQUFHO1lBQ1YsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSztnQkFDZCxRQUFRLEVBQUUsS0FBSzthQUNoQjtTQUNGLENBQUM7UUFFRixPQUFPLENBQUMs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aW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBIb3N0TGlzdGVuZXIsIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEYWRhdGFUeXBlLCBOZ3hEYWRhdGFTZXJ2aWNlfSBmcm9tICcuL25neC1kYWRhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7U3ViamVjdCwgdGltZXJ9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge2RlYm91bmNlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7RGFkYXRhUmVzcG9uc2V9IGZyb20gJy4vbW9kZWxzL2RhZGF0YS1yZXNwb25zZSc7XHJcbmltcG9ydCB7RGFkYXRhU3VnZ2VzdGlvbn0gZnJvbSAnLi9tb2RlbHMvc3VnZ2VzdGlvbic7XHJcbmltcG9ydCB7RGFkYXRhQ29uZmlnLCBEYWRhdGFDb25maWdEZWZhdWx0fSBmcm9tICcuL2RhZGF0YS1jb25maWcnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHt1bndyYXBIdG1sRm9yU2lua30gZnJvbSAnc2FmZXZhbHVlcyc7XHJcbmltcG9ydCB7Y3JlYXRlSHRtbH0gZnJvbSAnc2FmZXZhbHVlcy9pbXBsZW1lbnRhdGlvbi9odG1sX2ltcGwnO1xyXG5cclxuLypjb25zdCBOR1hfREFEQVRBX1ZBTElEQVRPUiA9IHtcclxuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neERhZGF0YUNvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWUsXHJcbn07Ki9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEYURhdGFWYWxpZGF0b3IodmFsdWUpIHtcclxuICByZXR1cm4gKGM6IEZvcm1Db250cm9sKSA9PiB7XHJcbiAgICBjb25zdCBlcnIgPSB7XHJcbiAgICAgIHJhbmdlRXJyb3I6IHtcclxuICAgICAgICBnaXZlbjogYy52YWx1ZSxcclxuICAgICAgICBleHBlY3RlZDogdmFsdWUsXHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChjLnZhbHVlICE9PSB2YWx1ZSkgPyBlcnIgOiBudWxsO1xyXG4gIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBdXRvY29tcGxldGUgSURzIG5lZWQgdG8gYmUgdW5pcXVlIGFjcm9zcyBjb21wb25lbnRzLCBzbyB0aGlzIGNvdW50ZXIgZXhpc3RzIG91dHNpZGUgb2ZcclxuICogdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLlxyXG4gKi9cclxubGV0IHVuaXF1ZURhZGF0YUlkQ291bnRlciA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1kYWRhdGEnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZGFkYXRhLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZGFkYXRhLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neERhZGF0YUNvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG4gIH0sIC8qTkdYX0RBREFUQV9WQUxJREFUT1IqL11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neERhZGF0YUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XHJcbiAgcHJpdmF0ZSB2OiBhbnkgPSAnJztcclxuICBjdXJyZW50Rm9jdXMgPSAtMTtcclxuXHJcbiAgb3BlbmVkID0gZmFsc2U7XHJcblxyXG4gIGRhdGE6IERhZGF0YVN1Z2dlc3Rpb25bXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKSBjb25maWc6IERhZGF0YUNvbmZpZyA9IERhZGF0YUNvbmZpZ0RlZmF1bHQ7XHJcbiAgQElucHV0KCkgYXBpS2V5OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBudWxsO1xyXG4gIEBJbnB1dCgpIHR5cGUgPSBEYWRhdGFUeXBlLmFkZHJlc3M7XHJcbiAgQElucHV0KCkgbGltaXQgPSBEYWRhdGFDb25maWdEZWZhdWx0LmxpbWl0O1xyXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XHJcbiAgQElucHV0KCkgbG9jYXRpb25zID0gbnVsbDtcclxuXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkU3VnZ2VzdGlvbjogRGFkYXRhU3VnZ2VzdGlvbjtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxEYWRhdGFTdWdnZXN0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8RGFkYXRhU3VnZ2VzdGlvbj4oKTtcclxuICAvLyBAT3V0cHV0KCkgc2VsZWN0ZWREYXRhID0gbmV3IEV2ZW50RW1pdHRlcjxEYURhdGFBZGRyZXNzIHwgRGFEYXRhRklPIHwgRGFEYXRhQmFuayB8IERhRGF0YVBhcnR5IHwgRGFEYXRhRW1haWw+KCk7XHJcbiAgLy8gQE91dHB1dCgpIHNlbGVjdGVkU3RyaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2lucHV0VmFsdWUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBpbnB1dFZhbHVlOiBFbGVtZW50UmVmO1xyXG5cclxuICBwcml2YXRlIGlucHV0U3RyaW5nJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgLyoqIFVuaXF1ZSBJRCB0byBiZSB1c2VkIGJ5IGF1dG9jb21wbGV0ZSB0cmlnZ2VyJ3MgXCJhcmlhLW93bnNcIiBwcm9wZXJ0eS4gKi9cclxuICBpZCA9IGBuZ3gtZGFkYXRhLSR7dW5pcXVlRGFkYXRhSWRDb3VudGVyKyt9YDtcclxuXHJcbiAgLy8gb25TdWdnZXN0aW9uU2VsZWN0ZWQgPSAodmFsdWU6IHN0cmluZykgPT4ge307XHJcbiAgb25Ub3VjaGVkID0gKCkgPT4ge307XHJcbiAgcHJvcGFnYXRlQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcclxuICB2YWxpZGF0ZUZuOiBhbnkgPSAoKSA9PiB7fTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBOZ3hEYWRhdGFTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsXHJcbiAgICApIHtcclxuICB9XHJcblxyXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMudjtcclxuICB9XHJcblxyXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcclxuICAgIGlmICh2ICE9PSB0aGlzLnYpIHtcclxuICAgICAgdGhpcy52ID0gdjtcclxuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2Uodik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8qdGhpcy52YWxpZGF0ZUZuID0gY3JlYXRlRGFEYXRhVmFsaWRhdG9yKHRoaXMuX3ZhbHVlKTtcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMuX3ZhbHVlKTsqL1xyXG4gICAgdGhpcy50eXBlID0gdGhpcy5jb25maWcudHlwZTtcclxuICAgIHRoaXMubG9jYXRpb25zID0gdGhpcy5jb25maWcubG9jYXRpb25zO1xyXG4gICAgdGhpcy5kYXRhU2VydmljZS5zZXRBcGlLZXkodGhpcy5hcGlLZXkgPyB0aGlzLmFwaUtleSA6IHRoaXMuY29uZmlnLmFwaUtleSk7XHJcbiAgICB0aGlzLmlucHV0U3RyaW5nJC5waXBlKFxyXG4gICAgICBkZWJvdW5jZSgoKSA9PiB0aW1lcih0aGlzLmNvbmZpZy5kZWxheSA/IHRoaXMuY29uZmlnLmRlbGF5IDogNTAwKSksXHJcbiAgICApLnN1YnNjcmliZSh4ID0+IHtcclxuICAgICAgdGhpcy5kYXRhU2VydmljZS5nZXREYXRhKHgsIHRoaXMudHlwZSwgdGhpcy5jb25maWcpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoeTogRGFkYXRhUmVzcG9uc2UpID0+IHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB5LnN1Z2dlc3Rpb25zO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLm9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMudmFsdWUpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ25nT25DaGFuZ2VzJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREYXRhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuaW5wdXRTdHJpbmckLm5leHQodmFsdWUpO1xyXG4gICAgdGhpcy5jdXJyZW50Rm9jdXMgPSAtMTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2soZTogTW91c2VFdmVudCwgaXRlbTogRGFkYXRhU3VnZ2VzdGlvbikge1xyXG4gICAgdGhpcy5pbnB1dFZhbHVlLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBpdGVtLnZhbHVlO1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UoaXRlbS52YWx1ZSk7XHJcbiAgICB0aGlzLmlucHV0VmFsdWUubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgdGhpcy5zZWxlY3RlZFN1Z2dlc3Rpb24gPSBpdGVtO1xyXG4gICAgdGhpcy5kYXRhID0gW107XHJcbiAgICB0aGlzLmN1cnJlbnRGb2N1cyA9IC0xO1xyXG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0ZWQuZW1pdChpdGVtKTtcclxuICAgIC8vIHRoaXMuc2VsZWN0ZWREYXRhLmVtaXQoaXRlbS5kYXRhKTtcclxuICAgIC8vIHRoaXMuc2VsZWN0ZWRTdHJpbmcuZW1pdChpdGVtLnZhbHVlKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcclxuICBvbk91dHNpZGVDbGljaygkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgIGlmICghdGhpcy5vcGVuZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoJGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgdGhpcy5kYXRhID0gW107XHJcbiAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkFycm93RG93bigpIHtcclxuICAgIHRoaXMucmVtb3ZlRm9jdXModGhpcy5jdXJyZW50Rm9jdXMpO1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEZvY3VzID49IHRoaXMuZGF0YS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEZvY3VzID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEZvY3VzKys7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldEZvY3VzKHRoaXMuY3VycmVudEZvY3VzKTtcclxuICB9XHJcblxyXG4gIG9uQXJyb3dVcCgpIHtcclxuICAgIHRoaXMucmVtb3ZlRm9jdXModGhpcy5jdXJyZW50Rm9jdXMpO1xyXG4gICAgaWYgKHRoaXMuY3VycmVudEZvY3VzID09PSAwKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEZvY3VzID0gdGhpcy5kYXRhLmxlbmd0aCAtIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmN1cnJlbnRGb2N1cy0tO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRGb2N1cyh0aGlzLmN1cnJlbnRGb2N1cyk7XHJcbiAgfVxyXG5cclxuICBvbkVudGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkU3VnZ2VzdGlvbiA9IHRoaXMuZGF0YVt0aGlzLmN1cnJlbnRGb2N1c107XHJcbiAgICB0aGlzLmlucHV0VmFsdWUubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuc2VsZWN0ZWRTdWdnZXN0aW9uLnZhbHVlO1xyXG4gICAgdGhpcy5kYXRhID0gW107XHJcbiAgICB0aGlzLmN1cnJlbnRGb2N1cyA9IC0xO1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5zZWxlY3RlZFN1Z2dlc3Rpb24udmFsdWUpO1xyXG4gICAgdGhpcy5zZWxlY3RlZC5lbWl0KHRoaXMuc2VsZWN0ZWRTdWdnZXN0aW9uKTtcclxuICAgIC8vIHRoaXMuc2VsZWN0ZWREYXRhLmVtaXQodGhpcy5zZWxlY3RlZFN1Z2dlc3Rpb24uZGF0YSk7XHJcbiAgICAvLyB0aGlzLnNlbGVjdGVkU3RyaW5nLmVtaXQodGhpcy5zZWxlY3RlZFN1Z2dlc3Rpb24udmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgc2V0Rm9jdXMoaWQ6IG51bWJlcikge1xyXG4gICAgY29uc3QgYWN0aXZlRWwgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkICsgJ2l0ZW0nKTtcclxuICAgIHRoaXMuci5hZGRDbGFzcyhhY3RpdmVFbCwgJ2FjdGl2ZScpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRm9jdXMoaWQ6IG51bWJlcikge1xyXG4gICAgaWYgKGlkICE9PSAtMSkge1xyXG4gICAgICBjb25zdCBhY3RpdmVFbCA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQgKyAnaXRlbScpO1xyXG4gICAgICB0aGlzLnIucmVtb3ZlQ2xhc3MoYWN0aXZlRWwsICdhY3RpdmUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy52ID0gdmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnYgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnIuc2V0UHJvcGVydHkodGhpcy5pbnB1dFZhbHVlLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB1bndyYXBIdG1sRm9yU2luayhjcmVhdGVIdG1sKHRoaXMudikpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkXHJcbiAgICogd2hlbiB0aGUgY29udHJvbCByZWNlaXZlcyBhIGNoYW5nZSBldmVudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBmbiBhIGZ1bmN0aW9uXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICAvLyB0aGlzLm9uU3VnZ2VzdGlvblNlbGVjdGVkID0gZm47XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWRcclxuICAgKiB3aGVuIHRoZSBjb250cm9sIHJlY2VpdmVzIGEgdG91Y2ggZXZlbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZm4gYSBmdW5jdGlvblxyXG4gICAqL1xyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbXBsZW1lbnRzIGRpc2FibGVkIHN0YXRlIGZvciB0aGlzIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkIERpc2FibGVkIHN0YXRlIGZsYWdcclxuICAgKi9cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiYXV0b2NvbXBsZXRlXCI+XHJcbiAgPGlucHV0IFtkaXNhYmxlZF09XCJkaXNhYmxlZCAgPyB0cnVlIDogbnVsbFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJzZWFyY2hcIiAjaW5wdXRWYWx1ZSAoaW5wdXQpPVwiZ2V0RGF0YShpbnB1dFZhbHVlLnZhbHVlKVwiXHJcbiAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIChrZXl1cC5BcnJvd0Rvd24pPVwib25BcnJvd0Rvd24oKVwiIChrZXl1cC5BcnJvd1VwKT1cIm9uQXJyb3dVcCgpXCJcclxuICAgICAgICAgKGtleXVwLkVudGVyKT1cIm9uRW50ZXIoJGV2ZW50KVwiIHNwZWxsY2hlY2s9XCJmYWxzZVwiIFsobmdNb2RlbCldPVwidmFsdWVcIiBhdXRvY29tcGxldGU9XCJvZmZcIiAvPlxyXG4gIDxkaXYgKm5nSWY9XCJkYXRhLmxlbmd0aFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImF1dG9jb21wbGV0ZS1pdGVtc1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYXV0b2NvbXBsZWxlLWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBkYXRhOyBsZXQgaSA9IGluZGV4XCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50LCBpdGVtKVwiIFtpZF09XCJpKydpdGVtJ1wiPlxyXG4gICAgICAgIHt7aXRlbS52YWx1ZX19XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cInR5cGU9PT0ncGFydHknXCI+XHJcbiAgICAgICAgICA8YnIvPlxyXG4gICAgICAgICAgPHNwYW4+e3tpdGVtLmRhdGE/Lmlubn19IHt7Y29uZmlnLnBhcnR5QWRkcmVzcyA9PT0gJ2Z1bGwnID8gaXRlbS5kYXRhPy5hZGRyZXNzPy52YWx1ZSA6IGl0ZW0uZGF0YT8uYWRkcmVzcz8uZGF0YT8uY2l0eX19PC9zcGFuPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=