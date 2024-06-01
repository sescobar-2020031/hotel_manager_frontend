import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelManagementRoutingModule } from './hotel-management-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { TyperoomListComponent } from './components/typeroom-list/typeroom-list.component';
import { TyperoomAddComponent } from './components/typeroom-add/typeroom-add.component';
import { TyperoomEditDeleteComponent } from './components/typeroom-edit-delete/typeroom-edit-delete.component';


@NgModule({
  declarations: [
    HomeComponent,
    TyperoomListComponent,
    TyperoomAddComponent,
    TyperoomEditDeleteComponent
  ],
  imports: [
    CommonModule,
    HotelManagementRoutingModule,
    SharedModule
  ]
})
export class HotelManagementModule { }
