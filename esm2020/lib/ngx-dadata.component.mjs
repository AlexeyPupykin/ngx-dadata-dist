import { Component, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild } from '@angular/core';
import { DadataType } from './ngx-dadata.service';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { DadataConfigDefault } from './dadata-config';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
    constructor(dataService, r, elRef) {
        this.dataService = dataService;
        this.r = r;
        this.elRef = elRef;
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
        const activeEl = document.getElementById(id + 'item');
        this.r.addClass(activeEl, 'active');
    }
    removeFocus(id) {
        if (id !== -1) {
            const activeEl = document.getElementById(id + 'item');
            this.r.removeClass(activeEl, 'active');
        }
    }
    writeValue(value) {
        if (value !== undefined) {
            this.v = value;
        }
        else {
            this.v = '';
        }
        this.r.setProperty(this.inputValue.nativeElement, 'innerHTML', this.v);
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
        alert('disabled!');
        this.disabled = isDisabled;
    }
}
NgxDadataComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDadataComponent, deps: [{ token: i1.NgxDadataService }, { token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
NgxDadataComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.1", type: NgxDadataComponent, selector: "ngx-dadata", inputs: { config: "config", apiKey: "apiKey", disabled: "disabled", type: "type", limit: "limit", placeholder: "placeholder", locations: "locations" }, outputs: { selectedSuggestion: "selectedSuggestion", selected: "selected" }, host: { listeners: { "document:click": "onOutsideClick($event)" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxDadataComponent),
            multi: true
        }, /*NGX_DADATA_VALIDATOR*/
    ], viewQueries: [{ propertyName: "inputValue", first: true, predicate: ["inputValue"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"autocomplete\">\n  <input [disabled]=\"disabled  ? true : null\" type=\"text\" class=\"search\" #inputValue (input)=\"getData(inputValue.value)\"\n         [placeholder]=\"placeholder\" (keyup.ArrowDown)=\"onArrowDown()\" (keyup.ArrowUp)=\"onArrowUp()\"\n         (keyup.Enter)=\"onEnter($event)\" spellcheck=\"false\" [(ngModel)]=\"value\" autocomplete=\"off\" />\n  <div *ngIf=\"data.length\">\n    <div class=\"autocomplete-items\">\n      <div class=\"autocomplele-item\" *ngFor=\"let item of data; let i = index\" (click)=\"onClick($event, item)\" [id]=\"i+'item'\">\n        {{item.value}}\n        <ng-template [ngIf]=\"type==='party'\">\n          <br/>\n          <span>{{item.data?.inn}} {{config.partyAddress === 'full' ? item.data?.address?.value : item.data?.address?.data?.city}}</span>\n        </ng-template>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".autocomplete{position:relative}input{border:0 solid transparent;background-color:#f1f1f1;padding:5px}input[type=text]{background-color:#f1f1f1;width:100%}input[type=submit]{background-color:#1e90ff;color:#fff}.autocomplete-items{position:absolute;border:1px solid #d4d4d4;border-bottom:none;border-top:none;z-index:99;top:100%;left:0;right:0}.autocomplete-items .autocomplele-item{padding:5px 10px;cursor:pointer;background-color:#fff;border-bottom:1px solid #d4d4d4}.autocomplete-items .autocomplele-item:hover{background-color:#e9e9e9}.autocomplete-items .autocomplele-item.active{background-color:#1e90ff!important;color:#fff}.autocomplete-items .autocomplele-item span{color:#555;font-size:80%}\n"], directives: [{ type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.1", ngImport: i0, type: NgxDadataComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-dadata', providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxDadataComponent),
                            multi: true
                        }, /*NGX_DADATA_VALIDATOR*/
                    ], template: "<div class=\"autocomplete\">\n  <input [disabled]=\"disabled  ? true : null\" type=\"text\" class=\"search\" #inputValue (input)=\"getData(inputValue.value)\"\n         [placeholder]=\"placeholder\" (keyup.ArrowDown)=\"onArrowDown()\" (keyup.ArrowUp)=\"onArrowUp()\"\n         (keyup.Enter)=\"onEnter($event)\" spellcheck=\"false\" [(ngModel)]=\"value\" autocomplete=\"off\" />\n  <div *ngIf=\"data.length\">\n    <div class=\"autocomplete-items\">\n      <div class=\"autocomplele-item\" *ngFor=\"let item of data; let i = index\" (click)=\"onClick($event, item)\" [id]=\"i+'item'\">\n        {{item.value}}\n        <ng-template [ngIf]=\"type==='party'\">\n          <br/>\n          <span>{{item.data?.inn}} {{config.partyAddress === 'full' ? item.data?.address?.value : item.data?.address?.data?.city}}</span>\n        </ng-template>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".autocomplete{position:relative}input{border:0 solid transparent;background-color:#f1f1f1;padding:5px}input[type=text]{background-color:#f1f1f1;width:100%}input[type=submit]{background-color:#1e90ff;color:#fff}.autocomplete-items{position:absolute;border:1px solid #d4d4d4;border-bottom:none;border-top:none;z-index:99;top:100%;left:0;right:0}.autocomplete-items .autocomplele-item{padding:5px 10px;cursor:pointer;background-color:#fff;border-bottom:1px solid #d4d4d4}.autocomplete-items .autocomplele-item:hover{background-color:#e9e9e9}.autocomplete-items .autocomplele-item.active{background-color:#1e90ff!important;color:#fff}.autocomplete-items .autocomplele-item span{color:#555;font-size:80%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.NgxDadataService }, { type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { config: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhZGF0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZGFkYXRhL3NyYy9saWIvbmd4LWRhZGF0YS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtZGFkYXRhL3NyYy9saWIvbmd4LWRhZGF0YS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBR04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxVQUFVLEVBQW1CLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR3hDLE9BQU8sRUFBZSxtQkFBbUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBbUQsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFFbkc7Ozs7SUFJSTtBQUVKLE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxLQUFLO0lBQ3pDLE9BQU8sQ0FBQyxDQUFjLEVBQUUsRUFBRTtRQUN4QixNQUFNLEdBQUcsR0FBRztZQUNWLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLEtBQUs7YUFDaEI7U0FDRixDQUFDO1FBRUYsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxJQUFJLHFCQUFxQixHQUFHLENBQUMs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RSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztZQUNqRCxLQUFLLEVBQUUsSUFBSTtTQUNaLEVBQUUsd0JBQXdCO0tBQUMsdUtDeEQ5QixxM0JBZ0JBOzJGRDBDYSxrQkFBa0I7a0JBWDlCLFNBQVM7K0JBQ0UsWUFBWSxhQUdYO3dCQUNUOzRCQUNBLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDOzRCQUNqRCxLQUFLLEVBQUUsSUFBSTt5QkFDWixFQUFFLHdCQUF3QjtxQkFBQzt3SkFVbkIsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUVJLGtCQUFrQjtzQkFBM0IsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUlvQyxVQUFVO3NCQUFwRCxTQUFTO3VCQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBeUV6QyxjQUFjO3NCQURiLFlBQVk7dUJBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhZGF0YVR5cGUsIE5neERhZGF0YVNlcnZpY2V9IGZyb20gJy4vbmd4LWRhZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7U3ViamVjdCwgdGltZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWJvdW5jZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtEYWRhdGFSZXNwb25zZX0gZnJvbSAnLi9tb2RlbHMvZGFkYXRhLXJlc3BvbnNlJztcbmltcG9ydCB7RGFkYXRhU3VnZ2VzdGlvbn0gZnJvbSAnLi9tb2RlbHMvc3VnZ2VzdGlvbic7XG5pbXBvcnQge0RhZGF0YUNvbmZpZywgRGFkYXRhQ29uZmlnRGVmYXVsdH0gZnJvbSAnLi9kYWRhdGEtY29uZmlnJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vKmNvbnN0IE5HWF9EQURBVEFfVkFMSURBVE9SID0ge1xuICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hEYWRhdGFDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07Ki9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURhRGF0YVZhbGlkYXRvcih2YWx1ZSkge1xuICByZXR1cm4gKGM6IEZvcm1Db250cm9sKSA9PiB7XG4gICAgY29uc3QgZXJyID0ge1xuICAgICAgcmFuZ2VFcnJvcjoge1xuICAgICAgICBnaXZlbjogYy52YWx1ZSxcbiAgICAgICAgZXhwZWN0ZWQ6IHZhbHVlLFxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gKGMudmFsdWUgIT09IHZhbHVlKSA/IGVyciA6IG51bGw7XG4gIH07XG59XG5cbi8qKlxuICogQXV0b2NvbXBsZXRlIElEcyBuZWVkIHRvIGJlIHVuaXF1ZSBhY3Jvc3MgY29tcG9uZW50cywgc28gdGhpcyBjb3VudGVyIGV4aXN0cyBvdXRzaWRlIG9mXG4gKiB0aGUgY29tcG9uZW50IGRlZmluaXRpb24uXG4gKi9cbmxldCB1bmlxdWVEYWRhdGFJZENvdW50ZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtZGFkYXRhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1kYWRhdGEuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZGFkYXRhLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hEYWRhdGFDb21wb25lbnQpLFxuICAgIG11bHRpOiB0cnVlXG4gIH0sIC8qTkdYX0RBREFUQV9WQUxJREFUT1IqL11cbn0pXG5leHBvcnQgY2xhc3MgTmd4RGFkYXRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcbiAgcHJpdmF0ZSB2OiBhbnkgPSAnJztcbiAgY3VycmVudEZvY3VzID0gLTE7XG5cbiAgb3BlbmVkID0gZmFsc2U7XG5cbiAgZGF0YTogRGFkYXRhU3VnZ2VzdGlvbltdID0gW107XG5cbiAgQElucHV0KCkgY29uZmlnOiBEYWRhdGFDb25maWcgPSBEYWRhdGFDb25maWdEZWZhdWx0O1xuICBASW5wdXQoKSBhcGlLZXk6IHN0cmluZztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBudWxsO1xuICBASW5wdXQoKSB0eXBlID0gRGFkYXRhVHlwZS5hZGRyZXNzO1xuICBASW5wdXQoKSBsaW1pdCA9IERhZGF0YUNvbmZpZ0RlZmF1bHQubGltaXQ7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG4gIEBJbnB1dCgpIGxvY2F0aW9ucyA9IG51bGw7XG5cbiAgQE91dHB1dCgpIHNlbGVjdGVkU3VnZ2VzdGlvbjogRGFkYXRhU3VnZ2VzdGlvbjtcbiAgQE91dHB1dCgpIHNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RGFkYXRhU3VnZ2VzdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPERhZGF0YVN1Z2dlc3Rpb24+KCk7XG4gIC8vIEBPdXRwdXQoKSBzZWxlY3RlZERhdGEgPSBuZXcgRXZlbnRFbWl0dGVyPERhRGF0YUFkZHJlc3MgfCBEYURhdGFGSU8gfCBEYURhdGFCYW5rIHwgRGFEYXRhUGFydHkgfCBEYURhdGFFbWFpbD4oKTtcbiAgLy8gQE91dHB1dCgpIHNlbGVjdGVkU3RyaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXRWYWx1ZScsIHsgc3RhdGljOiB0cnVlIH0pIGlucHV0VmFsdWU6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBpbnB1dFN0cmluZyQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgLyoqIFVuaXF1ZSBJRCB0byBiZSB1c2VkIGJ5IGF1dG9jb21wbGV0ZSB0cmlnZ2VyJ3MgXCJhcmlhLW93bnNcIiBwcm9wZXJ0eS4gKi9cbiAgaWQgPSBgbmd4LWRhZGF0YS0ke3VuaXF1ZURhZGF0YUlkQ291bnRlcisrfWA7XG5cbiAgLy8gb25TdWdnZXN0aW9uU2VsZWN0ZWQgPSAodmFsdWU6IHN0cmluZykgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuICBwcm9wYWdhdGVDaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xuICB2YWxpZGF0ZUZuOiBhbnkgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBOZ3hEYWRhdGFTZXJ2aWNlLFxuICAgIHByaXZhdGUgcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnY7XG4gIH1cblxuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMudikge1xuICAgICAgdGhpcy52ID0gdjtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHYpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8qdGhpcy52YWxpZGF0ZUZuID0gY3JlYXRlRGFEYXRhVmFsaWRhdG9yKHRoaXMuX3ZhbHVlKTtcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLl92YWx1ZSk7Ki9cbiAgICB0aGlzLnR5cGUgPSB0aGlzLmNvbmZpZy50eXBlO1xuICAgIHRoaXMubG9jYXRpb25zID0gdGhpcy5jb25maWcubG9jYXRpb25zO1xuICAgIHRoaXMuZGF0YVNlcnZpY2Uuc2V0QXBpS2V5KHRoaXMuYXBpS2V5ID8gdGhpcy5hcGlLZXkgOiB0aGlzLmNvbmZpZy5hcGlLZXkpO1xuICAgIHRoaXMuaW5wdXRTdHJpbmckLnBpcGUoXG4gICAgICBkZWJvdW5jZSgoKSA9PiB0aW1lcih0aGlzLmNvbmZpZy5kZWxheSA/IHRoaXMuY29uZmlnLmRlbGF5IDogNTAwKSksXG4gICAgKS5zdWJzY3JpYmUoeCA9PiB7XG4gICAgICB0aGlzLmRhdGFTZXJ2aWNlLmdldERhdGEoeCwgdGhpcy50eXBlLCB0aGlzLmNvbmZpZylcbiAgICAgICAgLnN1YnNjcmliZSgoeTogRGFkYXRhUmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5kYXRhID0geS5zdWdnZXN0aW9ucztcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLnZhbHVlKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnbmdPbkNoYW5nZXMnKTtcbiAgICB9XG4gIH1cblxuICBnZXREYXRhKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmlucHV0U3RyaW5nJC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLmN1cnJlbnRGb2N1cyA9IC0xO1xuICB9XG5cbiAgb25DbGljayhlOiBNb3VzZUV2ZW50LCBpdGVtOiBEYWRhdGFTdWdnZXN0aW9uKSB7XG4gICAgdGhpcy5pbnB1dFZhbHVlLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBpdGVtLnZhbHVlO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKGl0ZW0udmFsdWUpO1xuICAgIHRoaXMuaW5wdXRWYWx1ZS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy5zZWxlY3RlZFN1Z2dlc3Rpb24gPSBpdGVtO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMuY3VycmVudEZvY3VzID0gLTE7XG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkLmVtaXQoaXRlbSk7XG4gICAgLy8gdGhpcy5zZWxlY3RlZERhdGEuZW1pdChpdGVtLmRhdGEpO1xuICAgIC8vIHRoaXMuc2VsZWN0ZWRTdHJpbmcuZW1pdChpdGVtLnZhbHVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25PdXRzaWRlQ2xpY2soJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLm9wZW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jb250YWlucygkZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9uQXJyb3dEb3duKCkge1xuICAgIHRoaXMucmVtb3ZlRm9jdXModGhpcy5jdXJyZW50Rm9jdXMpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRGb2N1cyA+PSB0aGlzLmRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5jdXJyZW50Rm9jdXMgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRGb2N1cysrO1xuICAgIH1cbiAgICB0aGlzLnNldEZvY3VzKHRoaXMuY3VycmVudEZvY3VzKTtcbiAgfVxuXG4gIG9uQXJyb3dVcCgpIHtcbiAgICB0aGlzLnJlbW92ZUZvY3VzKHRoaXMuY3VycmVudEZvY3VzKTtcbiAgICBpZiAodGhpcy5jdXJyZW50Rm9jdXMgPT09IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEZvY3VzID0gdGhpcy5kYXRhLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudEZvY3VzLS07XG4gICAgfVxuICAgIHRoaXMuc2V0Rm9jdXModGhpcy5jdXJyZW50Rm9jdXMpO1xuICB9XG5cbiAgb25FbnRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMuc2VsZWN0ZWRTdWdnZXN0aW9uID0gdGhpcy5kYXRhW3RoaXMuY3VycmVudEZvY3VzXTtcbiAgICB0aGlzLmlucHV0VmFsdWUubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuc2VsZWN0ZWRTdWdnZXN0aW9uLnZhbHVlO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMuY3VycmVudEZvY3VzID0gLTE7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5zZWxlY3RlZFN1Z2dlc3Rpb24udmFsdWUpO1xuICAgIHRoaXMuc2VsZWN0ZWQuZW1pdCh0aGlzLnNlbGVjdGVkU3VnZ2VzdGlvbik7XG4gICAgLy8gdGhpcy5zZWxlY3RlZERhdGEuZW1pdCh0aGlzLnNlbGVjdGVkU3VnZ2VzdGlvbi5kYXRhKTtcbiAgICAvLyB0aGlzLnNlbGVjdGVkU3RyaW5nLmVtaXQodGhpcy5zZWxlY3RlZFN1Z2dlc3Rpb24udmFsdWUpO1xuICB9XG5cbiAgc2V0Rm9jdXMoaWQ6IG51bWJlcikge1xuICAgIGNvbnN0IGFjdGl2ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQgKyAnaXRlbScpO1xuICAgIHRoaXMuci5hZGRDbGFzcyhhY3RpdmVFbCwgJ2FjdGl2ZScpO1xuICB9XG5cbiAgcmVtb3ZlRm9jdXMoaWQ6IG51bWJlcikge1xuICAgIGlmIChpZCAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQgKyAnaXRlbScpO1xuICAgICAgdGhpcy5yLnJlbW92ZUNsYXNzKGFjdGl2ZUVsLCAnYWN0aXZlJyk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMudiA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnYgPSAnJztcbiAgICB9XG4gICAgdGhpcy5yLnNldFByb3BlcnR5KHRoaXMuaW5wdXRWYWx1ZS5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy52KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICAgKiB3aGVuIHRoZSBjb250cm9sIHJlY2VpdmVzIGEgY2hhbmdlIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0gZm4gYSBmdW5jdGlvblxuICAgKi9cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgLy8gdGhpcy5vblN1Z2dlc3Rpb25TZWxlY3RlZCA9IGZuO1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAgICogd2hlbiB0aGUgY29udHJvbCByZWNlaXZlcyBhIHRvdWNoIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0gZm4gYSBmdW5jdGlvblxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50cyBkaXNhYmxlZCBzdGF0ZSBmb3IgdGhpcyBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkIERpc2FibGVkIHN0YXRlIGZsYWdcbiAgICovXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGFsZXJ0KCdkaXNhYmxlZCEnKTtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImF1dG9jb21wbGV0ZVwiPlxuICA8aW5wdXQgW2Rpc2FibGVkXT1cImRpc2FibGVkICA/IHRydWUgOiBudWxsXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cInNlYXJjaFwiICNpbnB1dFZhbHVlIChpbnB1dCk9XCJnZXREYXRhKGlucHV0VmFsdWUudmFsdWUpXCJcbiAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIChrZXl1cC5BcnJvd0Rvd24pPVwib25BcnJvd0Rvd24oKVwiIChrZXl1cC5BcnJvd1VwKT1cIm9uQXJyb3dVcCgpXCJcbiAgICAgICAgIChrZXl1cC5FbnRlcik9XCJvbkVudGVyKCRldmVudClcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIiBbKG5nTW9kZWwpXT1cInZhbHVlXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgLz5cbiAgPGRpdiAqbmdJZj1cImRhdGEubGVuZ3RoXCI+XG4gICAgPGRpdiBjbGFzcz1cImF1dG9jb21wbGV0ZS1pdGVtc1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImF1dG9jb21wbGVsZS1pdGVtXCIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZGF0YTsgbGV0IGkgPSBpbmRleFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudCwgaXRlbSlcIiBbaWRdPVwiaSsnaXRlbSdcIj5cbiAgICAgICAge3tpdGVtLnZhbHVlfX1cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cInR5cGU9PT0ncGFydHknXCI+XG4gICAgICAgICAgPGJyLz5cbiAgICAgICAgICA8c3Bhbj57e2l0ZW0uZGF0YT8uaW5ufX0ge3tjb25maWcucGFydHlBZGRyZXNzID09PSAnZnVsbCcgPyBpdGVtLmRhdGE/LmFkZHJlc3M/LnZhbHVlIDogaXRlbS5kYXRhPy5hZGRyZXNzPy5kYXRhPy5jaXR5fX08L3NwYW4+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==