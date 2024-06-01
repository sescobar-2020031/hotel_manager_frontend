import {
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit {
  @Input() message!: string;
  @Input() text!: string;
  @Input() icon!: string;
  @Input() type: boolean = false;
  @Input() dismissible: boolean = false;
  @Input() haveButton: boolean = false;
  @Input() textButton: string = '';

  baseClass = 'notification alert';
  classes = '';
  buttonCallback !: Function;

  /** The instance of the component making up the content of the snack bar. */
  snackBarRef !: MatSnackBarRef<NotificationComponent>;

  constructor(@Optional() @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    if (data) {
      this.message = data.message;
      this.icon = data.icon;
      this.type = data.type;
      this.dismissible = data.dismissible;
      this.haveButton = data.haveButton;
      this.textButton = data.textButton;
      this.buttonCallback = data.buttonCallback;
    }
  }

  /** Dismisses the snack bar. */
  dismiss(): void {
    this.snackBarRef.dismiss();
  }

  onClick() {
    if (this.buttonCallback) {
      this.buttonCallback();
    }
  }

  ngOnInit(): void {
    this.classes = this.baseClass;
    this.classes += this.dismissible ? ' alert-dismissible' : '';
    this.classes += this.type ? ' alert-' + this.type : '';
  }
}
