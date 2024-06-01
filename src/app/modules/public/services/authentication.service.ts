import { Injectable } from '@angular/core';
import { AuthenticationRequest, RegisterRequest } from '../models/authentication.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ResponseDefault, UserLogged } from '../../../core/models/sessionUser.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  authenticateUser(authReq: AuthenticationRequest) : Observable<UserLogged> {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const URL = environment.AUTHENTICATE;

    return this.http.post<UserLogged>(
      URL,
      authReq,
      {
        headers: httpHeaders
      }
    );
  }

  registerClient(registerRequest: RegisterRequest) : Observable<ResponseDefault> {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const URL = environment.REGISTER;

    return this.http.post<ResponseDefault>(
      URL,
      registerRequest,
      {
        headers: httpHeaders
      }
    );
  }
}
