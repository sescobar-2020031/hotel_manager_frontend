import { Component, Input, forwardRef, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, ChangeDetectorRef, OnInit} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators, ValidatorFn, NG_VALIDATORS } from '@angular/forms';
import { SessionUserService } from '../../../../core/services/session-user.service';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor, AfterViewInit, OnInit {
  // References
  @ViewChild('inputRef') inputRef!: ElementRef;

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

  // Validators
  @Input() set required(value: boolean) {
    this.addOrRemoveValidator(value, Validators.required);
  }
  @Input() set validateEmail(value: boolean) {
    this.addOrRemoveValidator(value, Validators.email);
  }
  @Input() set minLength(value: number) {
    this.addOrRemoveValidator(value, Validators.minLength(value));
  }
  @Input() set maxLength(value: number) {
    this.addOrRemoveValidator(value, Validators.maxLength(value));
  }
  @Input() set pattern(value: string) {
    this.addOrRemoveValidator(value, Validators.pattern(value));
  }
  @Input() set min(value: number) {
    this.addOrRemoveValidator(value, Validators.min(value));
  }
  @Input() set max(value: number) {
    this.addOrRemoveValidator(value, Validators.max(value));
  }
  @Input() errorMessages: { [key: string]: string } = {};

  private _disabled = false;

  @Input() set disabled(value: boolean) {
    this._disabled = value;
    this.setDisabledState(value);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  // Restrictions

  @Input() onlyText?: boolean;
  @Input() onlyNumbers?: boolean;
  @Input() validateText?: boolean;
  @Input() validateAmount?: boolean;
  @Input() patternStrict?: RegExp;
  @Input() maxLengthStrict?: number;

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
    private cdRef: ChangeDetectorRef,
    public sessionUserService: SessionUserService,
  ) {}

  ngOnInit(): void {
    if(this.value){
      this.inputControl.setValue(this.value)
    }
  }

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
    if (this.inputControl.status === 'DISABLED' || this.inputControl.errors === null) {
      return null;
    }
    return this.inputControl.valid ? null : { customError: true };
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

  ngAfterViewInit() {
    if (this.autoFocus) {
      this.inputRef.nativeElement.focus();
      this.cdRef.detectChanges(); // run change detection again
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

    const validatedValue = this.getValidatedValue(event.key);

    if (validatedValue !== event.key) {
      event.preventDefault();
    }

    if (this.validateAmount) {
      if (validatedValue == "0.") {
        this.inputControl.setValue(this.getNewValue(validatedValue));
      }
    }
  }

  handlePaste(event: any): void {
    const pastedContent = event.clipboardData.getData('text');
    const validatedValue = this.getValidatedValue(pastedContent);
    if (validatedValue !== pastedContent) {
      event.preventDefault();
      // Inserts the validated value at the cursor position
      const endPos = this.inputRef.nativeElement.selectionEnd;
      this.inputControl.setValue(this.getNewValue(validatedValue));
      // Place the cursor after the pasted content
      this.inputRef.nativeElement.selectionEnd = endPos + validatedValue.length;
    }
  }

  getNewValue(newValue: string): string {
    const currentValue = this.inputControl.value || "";

    const startPos = this.inputRef.nativeElement.selectionStart;
    const endPos = this.inputRef.nativeElement.selectionEnd;

    return currentValue.substring(0, startPos) +
      newValue +
      currentValue.substring(endPos, currentValue.length)
  }

  getValidatedValue(value: string): string {

    if (this.onlyText) {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }

    if (this.validateText) {
      value = value.replace(/\\n|[\n\r]/g, '');
      value = value.replace(/[^a-zA-ZÀ-ÿ0-9,.;:+/*=?¿!¡$%&| -]/g, '');
    }

    if (this.validateAmount) {
      value = this.replaceInvalidAmount(value);
    }

    if (this.onlyNumbers) {
      value = value.replace(/\D/g, '');
    }

    if (this.patternStrict) {
      value = this.replaceInvalidPatternStrict(value, this.patternStrict);
    }

    return value;
  }

  replaceInvalidPatternStrict(value: string, pattern: RegExp): string {
    let currentValue = this.getNewValue("");
    let valueToAdd: string = '';

    for(let caracter of value){
      const newValue = currentValue + caracter;

      if(pattern.test(newValue)){
        valueToAdd += caracter;
        currentValue = newValue;
      }
    }

    return valueToAdd;
  }

  replaceInvalidAmount(value: string): string {
    value = value.replace(/[^0-9.]/g, '');

    const currentValue = this.getNewValue('');
    const newValue = this.getNewValue(value);

    let regex = /\./g;

    if (value.includes('.') && currentValue.includes('.')) {
      value = value.replace(regex, '');
    }

    if (newValue.startsWith('.')) {
      value = value.replace(regex, '0.');
    }

    if (value.indexOf('.') != value.lastIndexOf('.')) {
      value = value.replace(regex, (match, index) => {
        return value.lastIndexOf('.') == index ? match : '';
      });
    }

    return value;
  }


  handleBlur(event: any): void {
    this.onBlur.emit(event);

    if (this.validateAmount) {
      this.inputControl.setValue(
        this.sessionUserService.roundTo(this.inputControl.value, 2)
      )
    }
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
}
