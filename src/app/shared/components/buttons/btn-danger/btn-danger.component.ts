import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'btn-danger',
  templateUrl: './btn-danger.component.html',
  styleUrls: ['./btn-danger.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BtnDangerComponent implements AfterViewInit{
  @ViewChild('btnRef') btnRef!: ElementRef;

  // Attributes
  @Input() label: string = 'Rechazar';
  @Input() id!: string;
  @Input() name!: string;
  @Input() type: string = 'button';
  @Input() disabled!: boolean;
  @Input() autoFocus!: boolean;
  @Input() icon!: string;

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

  ngAfterViewInit() {
    if (this.autoFocus) {
      this.btnRef.nativeElement.focus();
      this.cdRef.detectChanges();
    }
  }
}
