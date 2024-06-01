import { Injectable } from '@angular/core';
import { SessionUserService } from '../../../core/services/session-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CreateHotelRequest, EditDeleteHotelData, EditHotelRequest, HotelListResponse } from '../models/hotel.interface';
import { Observable } from 'rxjs';
import { ResponseDefault } from '../../../core/models/sessionUser.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private hotelSelected: EditDeleteHotelData = {} as EditDeleteHotelData;

  constructor(
    private sessionUserService: SessionUserService,
    private http: HttpClient,
  ) { }

  getHotelList(): Observable<HotelListResponse> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.sessionUserService.userLogged.token.toString()
    });

    const URL = environment.HOTEL_LIST;
    return this.http.get<HotelListResponse>
      (
        URL,
        {
          headers: httpHeaders
        }
      );
  }

  
  createHotel(createHotelRequest: CreateHotelRequest) : Observable<ResponseDefault> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.sessionUserService.userLogged.token.toString()
    });

    const URL = environment.HOTEL_ADD;
    return this.http.post<ResponseDefault>(
      URL,
      createHotelRequest,
      {
        headers: httpHeaders
      }
    );
  }

  editHotel(editHotelRequest: EditHotelRequest) : Observable<ResponseDefault> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.sessionUserService.userLogged.token.toString()
    });

    const URL = environment.HOTEL_EDIT;
    return this.http.put<ResponseDefault>(
      URL,
      editHotelRequest,
      {
        headers: httpHeaders
      }
    );
  }

  setHotelSelected(hotelSelected: EditDeleteHotelData): void {
    this.hotelSelected = hotelSelected;
  }

  getHotelSelected(): EditDeleteHotelData {
    return this.hotelSelected;
  }
}
