import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HotelListComponent } from './components/hotel/hotel-list/hotel-list.component';
import { HotelAddComponent } from './components/hotel/hotel-add/hotel-add.component';
import { HotelEditDeleteComponent } from './components/hotel/hotel-edit-delete/hotel-edit-delete.component';
import { UserslistComponent } from './components/users/userslist/userslist.component';
import { UseraddComponent } from './components/users/useradd/useradd.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'hotellist',
    component: HotelListComponent
  },
  {
    path: 'hoteladd',
    component: HotelAddComponent
  },
  {
    path: 'hotel_edit_delete',
    component: HotelEditDeleteComponent
  },
  {
    path: 'userlist',
    component: UserslistComponent
  },
  {
    path: 'useradd',
    component: UseraddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperManagementRoutingModule { }
