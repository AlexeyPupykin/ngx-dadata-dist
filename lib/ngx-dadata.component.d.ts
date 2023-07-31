import { ElementRef, EventEmitter, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { DadataType, NgxDadataService } from './ngx-dadata.service';
import { DadataSuggestion } from './models/suggestion';
import { DadataConfig } from './dadata-config';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
export declare function createDaDataValidator(value: any): (c: FormControl) => {
    rangeError: {
        given: any;
        expected: any;
    };
};
export declare class NgxDadataComponent implements OnInit, ControlValueAccessor, OnChanges {
    private dataService;
    private r;
    private elRef;
    private v;
    currentFocus: number;
    opened: boolean;
    data: DadataSuggestion[];
    config: DadataConfig;
    apiKey: string;
    disabled: any;
    type: DadataType;
    limit: number;
    placeholder: string;
    locations: any;
    selectedSuggestion: DadataSuggestion;
    selected: EventEmitter<DadataSuggestion>;
    inputValue: ElementRef;
    private inputString$;
    /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
    id: string;
    onTouched: () => void;
    propagateChange: any;
    validateFn: any;
    constructor(dataService: NgxDadataService, r: Renderer2, elRef: ElementRef);
    get value(): any;
    set value(v: any);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getData(value: string): void;
    onClick(e: MouseEvent, item: DadataSuggestion): void;
    onOutsideClick($event: MouseEvent): void;
    onArrowDown(): void;
    onArrowUp(): void;
    onEnter(event: KeyboardEvent): void;
    setFocus(id: number): void;
    removeFocus(id: number): void;
    writeValue(value: any): void;
    /**
     * Set the function to be called
     * when the control receives a change event.
     *
     * @param fn a function
     */
    registerOnChange(fn: any): void;
    /**
     * Set the function to be called
     * when the control receives a touch event.
     *
     * @param fn a function
     */
    registerOnTouched(fn: any): void;
    /**
     * Implements disabled state for this element
     *
     * @param isDisabled Disabled state flag
     */
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxDadataComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxDadataComponent, "ngx-dadata", never, { "config": "config"; "apiKey": "apiKey"; "disabled": "disabled"; "type": "type"; "limit": "limit"; "placeholder": "placeholder"; "locations": "locations"; }, { "selectedSuggestion": "selectedSuggestion"; "selected": "selected"; }, never, never>;
}
