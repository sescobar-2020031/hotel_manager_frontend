import { Injectable } from "@angular/core";
import { UserLogged } from "../models/sessionUser.interface";
import { MatDialog } from "@angular/material/dialog";
import { AlertComponent } from "../../shared/components/alert/alert.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationComponent } from "../../shared/components/notification/notification.component";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionUserService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedIn.asObservable();
  public onLogin$ = new Subject<void>();
  public onLogOff$ = new Subject<void>();
  public userLogged!: UserLogged;
  public mySnackBarRef: any;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  get isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  detachFailureDialog(title: string, message: string, buttonText?: string) {
    return this.dialog.open(AlertComponent, {
      data: {
        icon: 'fa fa-times-circle',
        iconColor: 'failure',
        title: title,
        text: message,
        button: buttonText ?? 'OK'
      }
    }).afterClosed();
  }

  showErrorNotification(theMessage = ''): void {
    this.mySnackBarRef = this.snackBar.openFromComponent(
      NotificationComponent,
      {
        data: {
          message: theMessage,
          icon: 'warning',
          type: 'warning',
          dismissible: true
        },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['notification-wrapper', 'notification-wrapper-error']
      }
    );
    this.mySnackBarRef.instance.snackBarRef = this.mySnackBarRef;
  }

  showSuccessNotification(theMessage = ''): void {
    this.mySnackBarRef = this.snackBar.openFromComponent(
      NotificationComponent,
      {
        data: {
          message: theMessage,
          icon: 'info',
          type: 'info',
          dismissible: true
        },
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['notification-wrapper', 'notification-wrapper-error']
      }
    );
    this.mySnackBarRef.instance.snackBarRef = this.mySnackBarRef;
  }

  showSuccessDialog(title: string, message: string, buttonText?: string) {
    this.dialog.open(AlertComponent, {
      data: {
        icon: 'fa-solid fa-circle-check',
        iconColor: 'success',
        title: title,
        text: message,
        button: buttonText ? buttonText : 'OK'
      }
    });
  }

  roundTo(n: any, digits: any) {
    let negative = false;
    if (digits === undefined) {
      digits = 0;
    }
    if (n < 0) {
      negative = true;
      n = n * -1;
    }
    const multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if (negative) {
      n = (n * -1).toFixed(2);
    }
    return n;
  }

  logOff() {
    this.userLogged = {} as UserLogged;
    this.setLoggedIn(false);
    this.onLogOff$.next();
    this.showSuccessNotification(
      'Sesión de usuario terminada!',
    );
  }

  initApplicationLogin() {
    this.onLogin$.next();
  }
}
