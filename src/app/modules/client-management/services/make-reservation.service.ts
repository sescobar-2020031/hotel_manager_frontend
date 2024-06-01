import { Injectable } from '@angular/core';
import { HotelWithExtras } from '../../super-management/models/hotel.interface';
import { CreateReservation, Reservation, ConfirmReservation } from '../models/make-reservation.interface';
import { ResponseDefault } from '../../../core/models/sessionUser.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionUserService } from '../../../core/services/session-user.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MakeReservationService {
  private hotelSelected: HotelWithExtras = {} as HotelWithExtras;
  private reservation: Reservation = {} as Reservation;

  constructor(
    private http: HttpClient,
    private sessionUserService: SessionUserService
  ) { }

  setHotelSelected(hotelSelected: HotelWithExtras): void {
    this.hotelSelected = hotelSelected;
  }

  getHotelSelected(): HotelWithExtras {
    return this.hotelSelected;
  }

  setReservation(reservation: Reservation): void {
    this.reservation = reservation;
  }

  getReservation(): Reservation {
    return this.reservation;
  }

  createReservation(
    createReservation: CreateReservation
  ): Observable<ResponseDefault> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + this.sessionUserService.userLogged.token.toString(),
    });

    const URL = environment.RESERVATIONS_ADD;
    return this.http.post<ResponseDefault>(URL, createReservation, {
      headers: httpHeaders,
    });
  }

  confirmReservation(
    createReservation: ConfirmReservation
  ): Observable<ResponseDefault> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + this.sessionUserService.userLogged.token.toString(),
    });

    const URL = environment.RESERVATIONS_ADD;
    return this.http.post<ResponseDefault>(URL, createReservation, {
      headers: httpHeaders,
    });
  }
}
