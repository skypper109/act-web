import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated || isAuthenticated !== 'true') {
      window.location.href = '/login';
      return false;
    }
  }
  return true;
};
