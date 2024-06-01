import { Injectable } from '@angular/core';
import { SessionUserService } from '../../../core/services/session-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  CreateTypeRequest,
  EditDeleteTypeData,
  EditTypeRequest,
  TypesResponse,
} from '../models/type.interface';
import { Observable } from 'rxjs';
import { ResponseDefault } from '../../../core/models/sessionUser.interface';

@Injectable({
  providedIn: 'root',
})
export class TypesService {
  private hotelSelected: EditDeleteTypeData = {} as EditDeleteTypeData;

  constructor(
    private sessionUserService: SessionUserService,
    private http: HttpClient
  ) {}

  getHotelList(): Observable<TypesResponse> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + this.sessionUserService.userLogged.token.toString(),
    });

    const URL = environment.TYPES_ALL;
    return this.http.get<TypesResponse>(URL, {
      headers: httpHeaders,
    });
  }

  createHotel(
    createHotelRequest: CreateTypeRequest
  ): Observable<ResponseDefault> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + this.sessionUserService.userLogged.token.toString(),
    });

    const URL = environment.TYPES_ALL;
    return this.http.post<ResponseDefault>(URL, createHotelRequest, {
      headers: httpHeaders,
    });
  }

  editHotel(editHotelRequest: EditTypeRequest): Observable<ResponseDefault> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + this.sessionUserService.userLogged.token.toString(),
    });

    const URL = environment.TYPES_ALL;
    return this.http.put<ResponseDefault>(URL, editHotelRequest, {
      headers: httpHeaders,
    });
  }

  setHotelSelected(hotelSelected: EditDeleteTypeData): void {
    this.hotelSelected = hotelSelected;
  }

  getHotelSelected(): EditDeleteTypeData {
    return this.hotelSelected;
  }
}
