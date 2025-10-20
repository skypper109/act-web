import { Inject, Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const isAuthenticated = Auth.isAuthenticated();

    if (!isAuthenticated) {
      window.location.href = '/login';
      return false;
    }
  }
  return true;
};

