import { CanActivateFn, Router } from '@angular/router';
import { SessionUserService } from '../services/session-user.service';
import { inject } from '@angular/core';

export const onlyClientGuard: CanActivateFn = (route, state) => {
  try {
    const sessionUserService = inject(SessionUserService);

    const isLoggedIn = sessionUserService.isLoggedIn;
    if (!isLoggedIn) throw new Error('Session user');
  
    const userRole = sessionUserService.userLogged.dataUser.role;
    if (!userRole) throw new Error('Invalid user role');
    if (userRole !== 'Cliente') throw new Error('Role not authorized');

    return true;
  } catch (err) {
    const router = inject(Router);
    const sessionUserService = inject(SessionUserService);
    sessionUserService.showErrorNotification(
      'Usuario no autorizado! 😡',
    );
    router.navigate(['/home/login']);
    return false;
  }
};
