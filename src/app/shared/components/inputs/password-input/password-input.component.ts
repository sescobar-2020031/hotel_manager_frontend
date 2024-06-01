import { Component, Input, forwardRef, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators, ValidatorFn, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('inputRef') inputRef!: ElementRef;

  // Attributes
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() autoFocus!: boolean;
  @Input() icon!: string;
  hide = true;

  // Validators
  @Input() set required(value: boolean) {
    this.addOrRemoveValidator(value, Validators.required);
  }
  @Input() errorMessages: { [key: string]: string } = {};

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

  inputControl = new FormControl();

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
    return this.inputControl.valid ? null : { customError: true };
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  ngAfterViewInit() {
    if (this.autoFocus) {
      this.inputRef.nativeElement.focus();
      this.cdRef.detectChanges();
    }
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

  handleInput(event: any): void {
    this.onInput.emit(event);
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

  mouseDown(event: any) {
    if (event.which == 1 || (event.type == 'touchstart' && event.which == 0)) {
      this.hide = false;
    }
  }

  mouseUp() {
    this.hide = true;
  }
}
