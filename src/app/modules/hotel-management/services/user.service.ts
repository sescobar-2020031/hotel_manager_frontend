import { Injectable } from '@angular/core';
import { SessionUserService } from '../../../core/services/session-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDefault } from '../../../core/models/sessionUser.interface';
import { CreateUserRequest, UserListResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private sessionUserService: SessionUserService,
    private http: HttpClient,
  ) { }

  getUsersList(): Observable<UserListResponse> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.sessionUserService.userLogged.token.toString()
    });

    const URL = environment.USERS_LIST;
    return this.http.get<UserListResponse>
      (
        URL,
        {
          headers: httpHeaders
        }
      );
  }

  
  createUser(createUserRequest: CreateUserRequest) : Observable<ResponseDefault> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.sessionUserService.userLogged.token.toString()
    });

    const URL = environment.USERS_ADD;
    return this.http.post<ResponseDefault>(
      URL,
      createUserRequest,
      {
        headers: httpHeaders
      }
    );
  }
}
