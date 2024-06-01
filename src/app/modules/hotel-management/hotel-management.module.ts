import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelManagementRoutingModule } from './hotel-management-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HotelManagementRoutingModule,
    SharedModule
  ]
})
export class HotelManagementModule { }
