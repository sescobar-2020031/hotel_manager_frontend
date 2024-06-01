import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MakeReservationComponent } from './components/make-reservation/make-reservation.component';
import { ListReservationsComponent } from './components/list-reservations/list-reservations.component';

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
    path: 'makereservation',
    component: MakeReservationComponent
  },
  {
    path: 'listreservation',
    component: ListReservationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagementRoutingModule { }
