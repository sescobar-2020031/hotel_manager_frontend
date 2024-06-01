import { ChangeDetectorRef, Component, AfterContentInit, EventEmitter, Input, Output, QueryList, ViewChild, ViewEncapsulation, forwardRef, ContentChildren, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidatorFn, Validators } from '@angular/forms';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { SelectOption } from '../models/select-input.interface';
import { MatSelect } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true
    }
  ]
})
export class SelectInputComponent implements ControlValueAccessor, AfterContentInit, AfterViewInit {
  // References
  @ViewChild('selectRef') selectRef!: MatSelect;
  @ContentChildren(SelectOptionComponent) contentOptions!: QueryList<SelectOptionComponent>;

  // Attributes
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() autoFocus!: boolean;
  @Input() icon!: string;
  @Input() textPrefix!: string;
  @Input() value!: string;
  @Input() hint!: string;
  @Input() multiple!: boolean;
  @Input() shortText!: boolean;
  @Input() search = false;
  options!: SelectOption[];
  private _disabled = false;
  private _onDestroy = new Subject<void>();

  // Validators
  @Input() set required(value: boolean) {
    this.addOrRemoveValidator(value, Validators.required);
  }

  @Input() errorMessages: { [key: string]: string } = {};

  @Input() set disabled(value: boolean) {
    this._disabled = value;
    this.setDisabledState(value);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this._disabled || isDisabled) {
      this._disabled = true;
      this.inputControl.disable();
    } else {
      this._disabled = false;
      this.inputControl.enable();
    }
  }

  // Events
  @Output() onBlur: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFocus: EventEmitter<any> = new EventEmitter<any>();
  @Output() onKeyDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() onKeyUp: EventEmitter<any> = new EventEmitter<any>();
  @Output() onKeyPress: EventEmitter<any> = new EventEmitter<any>();
  @Output() onInput: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDblClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMouseDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMouseUp: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.value) {
      this.inputControl.setValue(this.value)
    }
  }

  ngAfterViewInit() {
    if (this.autoFocus) {
      this.selectRef.focus();
      this.selectRef.open();
    }
  }

  ngAfterContentInit(): void {
    this.updateOptions();
    this.contentOptions.changes.subscribe(() => {
      this.updateOptions();
    });
  }

  updateOptions() {
    const projectedOptions = this.contentOptions.map(option => ({
      label: option.label,
      value: option.value,
      disabled: option.disabled || false,
      image: option.image
    }));
    this.options = projectedOptions

    if (this.search) {
      this.filteredOptions = this.options.slice();

      this.filterControl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(value => {
          this.filteredOptions = this._filter(value);
        });
    } else {
      this.filteredOptions = this.options;
    }

    this.cdRef.detectChanges();
  }

  inputControl = new FormControl();
  filterControl = new FormControl();
  filteredOptions: SelectOption[] = [];

  writeValue(value: any): void {
    this.inputControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.inputControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    // Implement if needed
  }

  validate(control: FormControl): { [key: string]: any } | null {
    if (this.inputControl.status === 'DISABLED' || this.inputControl.errors === null) {
      return null;
    }
    return this.inputControl.valid ? null : { customError: true };
  }

  private _filter(value: string): SelectOption[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  addOrRemoveValidator(condition: any, validator: ValidatorFn) {
    const validators: ValidatorFn[] = this.inputControl.validator ? [this.inputControl.validator] : [];
    if (condition) {
      validators.push(validator);
    } else {
      const index = validators.indexOf(validator);
      if (index > -1) {
        validators.splice(index, 1);
      }
    }
    this.inputControl.setValidators(validators);
    this.inputControl.updateValueAndValidity();
  }

  handleKeyPress(event: any): void {
    this.onKeyPress.emit(event);
  }

  handleBlur(event: any): void {
    this.onBlur.emit(event);
  }

  handleFocus(event: any): void {
    this.onFocus.emit(event);
  }

  handleKeyDown(event: any): void {
    this.onKeyDown.emit(event);
  }

  handleKeyUp(event: any): void {
    this.onKeyUp.emit(event);
  }

  handleChange(event: any): void {
    this.onChange.emit(event);
  }

  handleClick(event: any): void {
    this.onClick.emit(event);
  }

  handleDblClick(event: any): void {
    this.onDblClick.emit(event);
  }

  handleMouseDown(event: any): void {
    this.onMouseDown.emit(event);
  }

  handleMouseUp(event: any): void {
    this.onMouseUp.emit(event);
  }
}
