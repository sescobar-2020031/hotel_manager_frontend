import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientManagementRoutingModule } from './client-management-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { MakeReservationComponent } from './components/make-reservation/make-reservation.component';
import { ListReservationsComponent } from './components/list-reservations/list-reservations.component';
import { SelectRoomComponent } from './components/select-room/select-room.component';
import { ReservationModalComponent } from './components/reservation-modal/reservation-modal.component';


@NgModule({
  declarations: [
    HomeComponent,
    MakeReservationComponent,
    ListReservationsComponent,
    SelectRoomComponent,
    ReservationModalComponent
  ],
  imports: [
    CommonModule,
    ClientManagementRoutingModule,
    SharedModule
  ]
})
export class ClientManagementModule { }
