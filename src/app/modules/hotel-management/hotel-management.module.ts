import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelManagementRoutingModule } from './hotel-management-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { TyperoomAddComponent } from './components/typeroom/typeroom-add/typeroom-add.component';
import { TyperoomEditDeleteComponent } from './components/typeroom/typeroom-edit-delete/typeroom-edit-delete.component';
import { TyperoomListComponent } from './components/typeroom/typeroom-list/typeroom-list.component';
import { RoomsAddComponent } from './components/rooms/rooms-add/rooms-add.component';
import { RoomsEditDeleteComponent } from './components/rooms/rooms-edit-delete/rooms-edit-delete.component';
import { RoomsListComponent } from './components/rooms/rooms-list/rooms-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    TyperoomListComponent,
    TyperoomAddComponent,
    TyperoomEditDeleteComponent,
    RoomsListComponent,
    RoomsAddComponent,
    RoomsEditDeleteComponent
  ],
  imports: [
    CommonModule,
    HotelManagementRoutingModule,
    SharedModule
  ]
})
export class HotelManagementModule { }
