import { inject, Inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const isAuthenticated = Auth.isAuthenticated();
    const route = inject(Router);

    if (!isAuthenticated) {
      // window.location.href = '/login';
      route.navigateByUrl('/login');
      return false;
    }
  }
  return true;
};

