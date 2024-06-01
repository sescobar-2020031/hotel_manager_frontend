import { Component } from '@angular/core';
import {
  Hotel,
  HotelWithExtras,
} from '../../../super-management/models/hotel.interface';
import {
  RoomWithExtras,
  Rooms,
  RoomsResponse,
} from '../../../hotel-management/models/rooms.interface';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../../super-management/services/hotel.service';
import { MatDialog } from '@angular/material/dialog';
import { MakeReservationService } from '../../services/make-reservation.service';
import { RoomsService } from '../../services/rooms.service';
import { SessionUserService } from '../../../../core/services/session-user.service';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { ConfirmReservation, CreateReservation } from '../../models/make-reservation.interface';

@Component({
  selector: 'hotelmger-select-room',
  templateUrl: './select-room.component.html',
  styleUrl: './select-room.component.scss',
})
export class SelectRoomComponent {
  hotel!: HotelWithExtras;
  rooms: RoomWithExtras[] = [];
  images: string[] = [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/518332246.jpg?k=852d9e83009ac082a7bb8366d5e27fb1f21801ea9cb6dde9c14e1aa99c49ea63&o=&hp=1',
    'https://media.istockphoto.com/id/472899538/photo/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab.jpg?s=612x612&w=0&k=20&c=rz-WSe_6gKfkID6EL9yxCdN_UIMkXUBsr67884j-X9o=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnHFyGj0c1K-Mk106ZGT-juvcp-4Z8aMocHw&s',
    'https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZsnjx001ElbWv7pBT6k3ozorcjQOlfm-GYw&s',
    'https://media-api.xogrp.com/images/9f14737c-2be7-4b2f-80ed-d9c36556e7dd~rs_768.h',
    'https://media.istockphoto.com/id/119926339/es/foto/piscina-del-complejo-tur%C3%ADstico.jpg?s=612x612&w=0&k=20&c=xL-i7eF0tFmfvjZbWkOSvJTH5pzMVKWPt1iCTfZGwnw=',
    'https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/65046bf150d1abb7e5911702_x-65046bcfdc4f0.webp',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVBBG2nPwGQPO3qiCbizRb7Bu8MbjdHHCdg&s',
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/492106100.jpg?k=e5094f3f7d90049f7afda56b1e4756a152dfe658b5731b5de61cd50bc04c0e33&o=&hp=1',
  ];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private roomsResponse: RoomsService,
    private dialog: MatDialog,
    private makeReservationService: MakeReservationService,
    private sessionUserService: SessionUserService
  ) {}

  ngOnInit() {
    this.hotel = this.makeReservationService.getHotelSelected();
    this.loadRooms();
  }

  loadRooms() {
    this.roomsResponse.getRoomlList().subscribe({
      next: (response) => {
        this.rooms = [];
        response.data.forEach((room) => {
          if (room.hotel_ID == this.hotel.hotel_ID) {
            this.rooms.push({
              ...room,
              image: this.getRandomImage(),
              score: this.getRandomScore(),
            });
          }
        });
        this.loading = true;
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error obteniendo habitaciones',
            err.error.message ||
              'Error obteniendo habitaciones, intenta más tarde'
          );
        }
        this.loading = false;
      },
    });
  }

  openReservationModal(room: Rooms) {
    const dialogRef = this.dialog.open(ReservationModalComponent, {
      width: '400px',
      data: { room },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createReservation(room, result.checkInDate, result.checkOutDate);
      }
    });
  }

  getRandomScore(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  getRandomImage(): string {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }

  createReservation(room: Rooms, checkInDate: Date, checkOutDate: Date) {
    let createReservationRequest: CreateReservation = {
      Client_ID: this.sessionUserService.userLogged.dataUser.user_id,
      Employee_ID: 0,
      Hotel_ID: this.hotel.hotel_ID,
      Check_Out_Date: checkOutDate,
      Check_In_Date: checkInDate,
      Room_ID: room.room_ID,
    };

    this.makeReservationService
      .createReservation(createReservationRequest)
      .subscribe({
        next: (response) => {
          this.sessionUserService.showSuccessDialog(
            'Habitación reservada',
            'Tu habitación se ha realizado con éxito'
          );
          this.loading = true;
        },
        complete: () => {
          this.loading = false;
        },
        error: (err) => {
          if (err.error.showMessageError) {
            this.sessionUserService.detachFailureDialog(
              'Error reservando habitación',
              err.error.message ||
                'Error intentando reservar habitación, intenta más tarde'
            );
          }
          this.loading = false;
        },
      });
  }

  confirmReservation() {
    let confirmReservationRequest: ConfirmReservation = {
      Reservation_ID: this.makeReservationService.getReservation().Reservation_ID,
    };
    this.makeReservationService
    .confirmReservation(confirmReservationRequest)
    .subscribe({
      next: (response) => {
        this.sessionUserService.showSuccessDialog(
          'Reservación exitosa',
          'Tu reservación se ha realizado con éxito'
        );
        this.loading = true;
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        if (err.error.showMessageError) {
          this.sessionUserService.detachFailureDialog(
            'Error haciendo reservación',
            err.error.message ||
              'Error intentando tu reservación, intenta más tarde'
          );
        }
        this.loading = false;
      },
    });
  }
}
