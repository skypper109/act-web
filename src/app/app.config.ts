import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { InterceptorHttp } from './intercepteur/http-interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideSpinnerConfig } from 'ngx-spinner';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { Env } from './env';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideAnimations(

    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttp,
      multi: true
    },
    provideHttpClient(withFetch()),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideSpinnerConfig({
      type: 'ball-scale-multiple',
    }),
    provideFirebaseApp(() => initializeApp(Env.firebase)),

    // Optionnel :
    provideAnalytics(() => getAnalytics()),

    // Si tu utilises Firestore :
    provideFirestore(() => getFirestore()),

    // Si tu utilises l’auth :
    provideAuth(() => getAuth())
  ]
};
