import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { onlyClientGuard } from './core/guards/only-client.guard';
import { onlyHotelGuard } from './core/guards/only-hotel.guard';
import { onlySuperAdminGuard } from './core/guards/only-super-admin.guard';
import { logoutGuard } from './core/guards/logout.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/landing',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/public/public.module').then(a => a.PublicModule),
    canActivate: [logoutGuard]
  },
  {
    path: 'client',
    loadChildren: () => import('./modules/client-management/client-management.module').then(a => a.ClientManagementModule),
    canActivate: [onlyClientGuard]
  },
  {
    path: 'hotel',
    loadChildren: () => import('./modules/hotel-management/hotel-management.module').then(a => a.HotelManagementModule),
    canActivate: [onlyHotelGuard]
  },
  {
    path: 'super',
    loadChildren: () => import('./modules/super-management/super-management.module').then(a => a.SuperManagementModule),
    canActivate: [onlySuperAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
