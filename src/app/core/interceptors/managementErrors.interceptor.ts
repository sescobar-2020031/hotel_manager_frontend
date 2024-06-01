import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionUserService } from '../services/session-user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public sessionUserService: SessionUserService,
    private router: Router,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string | undefined;
        let showMessageError: boolean = false;

        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
          showMessageError = true;
        } else {
          // Errores HTTP.
          switch (error.status) {
            case 401:
              this.sessionUserService.showErrorNotification(
                'Usuario no autorizado, intenta más tarde.',
              );
              this.router.navigate(['/home/login']);
              break;
            case 504:
              this.sessionUserService.showErrorNotification(
                'Error de conexión, intenta más tarde.',
              );
              break;
            case 500:
              this.sessionUserService.showErrorNotification(
                'Lo sentimos, se ha producido un error interno, intenta más tarde.',
              );
              break;
            default:
              // Otros errores HTTP.
              errorMessage = this.managementError(error);
              showMessageError = true;
              break;
          }
        }

        const errorDetails = {
          message: errorMessage,
          statusCode: error.status,
          showMessageError: showMessageError,
          descriptionErrors: error.error?.descriptionErrors
        };

        return throwError(() => new HttpErrorResponse({
          status: error.status,
          statusText: errorMessage,
          error: errorDetails,
          url: request.url,
        }));
      })
    );
  }

  private managementError(error: HttpErrorResponse): string | undefined {
    if (error.error?.error?.message) {
      return error.error.error.message;
    } else if (error.error?.error) {
      return error.error.error;
    } else if (error.error.message) {
      return error.error?.message;
    } else if (error.error) {
      return error.error;
    } else {
      return undefined;
    }
  }
}
