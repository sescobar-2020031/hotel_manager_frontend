import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AddAditionalInfoInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Clonar la solicitud y agregar el encabezado de autorización
    const request = req.clone({
      setHeaders: {
        'Apikey': environment.apiKey
      }
    });

    // Enviar la solicitud modificada al siguiente controlador
    return next.handle(request);
  }
}
