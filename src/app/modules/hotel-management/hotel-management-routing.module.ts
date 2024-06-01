import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TyperoomListComponent } from './components/typeroom-list/typeroom-list.component';
import { TyperoomAddComponent } from './components/typeroom-add/typeroom-add.component';
import { TyperoomEditDeleteComponent } from './components/typeroom-edit-delete/typeroom-edit-delete.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelManagementRoutingModule {}
