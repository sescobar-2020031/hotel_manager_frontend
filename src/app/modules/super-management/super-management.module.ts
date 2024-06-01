import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperManagementRoutingModule } from './super-management-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';
import { HotelListComponent } from './components/hotel/hotel-list/hotel-list.component';
import { HotelAddComponent } from './components/hotel/hotel-add/hotel-add.component';
import { HotelEditDeleteComponent } from './components/hotel/hotel-edit-delete/hotel-edit-delete.component';
import { UserslistComponent } from './components/users/userslist/userslist.component';
import { UseraddComponent } from './components/users/useradd/useradd.component';


@NgModule({
  declarations: [
    HomeComponent,
    HotelListComponent,
    HotelAddComponent,
    HotelEditDeleteComponent,
    UserslistComponent,
    UseraddComponent
  ],
  imports: [
    CommonModule,
    SuperManagementRoutingModule,
    SharedModule
  ]
})
export class SuperManagementModule { }
