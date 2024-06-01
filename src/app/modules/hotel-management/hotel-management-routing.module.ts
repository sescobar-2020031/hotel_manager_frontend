import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TyperoomListComponent } from './components/typeroom/typeroom-list/typeroom-list.component';
import { TyperoomAddComponent } from './components/typeroom/typeroom-add/typeroom-add.component';
import { TyperoomEditDeleteComponent } from './components/typeroom/typeroom-edit-delete/typeroom-edit-delete.component';
import { RoomsListComponent } from './components/rooms/rooms-list/rooms-list.component';
import { RoomsAddComponent } from './components/rooms/rooms-add/rooms-add.component';
import { RoomsEditDeleteComponent } from './components/rooms/rooms-edit-delete/rooms-edit-delete.component';
import { UserslistComponent } from './components/users/userslist/userslist.component';
import { UseraddComponent } from './components/users/useradd/useradd.component';

/** Llegar siempre desde hotel/{ruta} */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'types',
    component: TyperoomListComponent,
  },
  {
    path: 'addTypes',
    component: TyperoomAddComponent,
  },
  {
    path: 'edit_delete_types',
    component: TyperoomEditDeleteComponent,
  },
  {
    path: 'rooms',
    component: RoomsListComponent,
  },
  {
    path: 'addRooms',
    component: RoomsAddComponent,
  },
  {
    path: 'edit_delete_rooms',
    component: RoomsEditDeleteComponent,
  },
  {
    path: 'users',
    component: UserslistComponent,
  },
  {
    path: 'addUsers',
    component: UseraddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelManagementRoutingModule {}
