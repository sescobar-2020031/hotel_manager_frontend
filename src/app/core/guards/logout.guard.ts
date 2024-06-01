import { CanActivateFn, Router } from '@angular/router';
import { SessionUserService } from '../services/session-user.service';
import { inject } from '@angular/core';

export const logoutGuard: CanActivateFn = (route, state) => {
  const sessionUserService = inject(SessionUserService);
  const isLoggedIn = sessionUserService.isLoggedIn;
  if (isLoggedIn) {
    sessionUserService.logOff();
  }

  return true;
};