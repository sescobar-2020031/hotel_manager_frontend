import { Injectable } from '@angular/core';
import { SessionUserService } from '../../../core/services/session-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDefault } from '../../../core/models/sessionUser.interface';
import { CreateRoomRequest, EditDeleteRoomData, EditRoomRequest, RoomsResponse } from '../../hotel-management/models/rooms.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  private hotelSelected: EditDeleteRoomData = {} as EditDeleteRoomData;

  constructor(
    private sessionUserService: SessionUserService,
    private http: HttpClient
  ) {}

  getRoomlList(): Observable<RoomsResponse> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + this.sessionUserService.userLogged.token.toString(),
    });

    const URL = environment.ROOMS_GET;
    return this.http.get<RoomsResponse>(URL, {
      headers: httpHeaders,
    });
  }

  createRoom(
    createHotelRequest: CreateRoomRequest
  ): Observable<ResponseDefault> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + this.sessionUserService.userLogged.token.toString(),
    });

    const URL = environment.ROOMS_ADD;
    return this.http.post<ResponseDefault>(URL, createHotelRequest, {
      headers: httpHeaders,
    });
  }

  editHotel(editHotelRequest: EditRoomRequest): Observable<ResponseDefault> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + this.sessionUserService.userLogged.token.toString(),
    });

    const URL = environment.ROOMS_EDIT;
    return this.http.put<ResponseDefault>(URL, editHotelRequest, {
      headers: httpHeaders,
    });
  }

  setHotelSelected(hotelSelected: EditDeleteRoomData): void {
    this.hotelSelected = hotelSelected;
  }

  getHotelSelected(): EditDeleteRoomData {
    return this.hotelSelected;
  }
}
