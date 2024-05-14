import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    HttpClientModule,
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'icross-v2',
          appId: '1:623228260695:web:74a5fa0064e78ca7ca6e12',
          storageBucket: 'icross-v2.appspot.com',
          apiKey: 'AIzaSyDwgjK2pEX8mmlf3YT68PdNxaocU2bp51I',
          authDomain: 'icross-v2.firebaseapp.com',
          messagingSenderId: '623228260695',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"icross-v2","appId":"1:623228260695:web:74a5fa0064e78ca7ca6e12","storageBucket":"icross-v2.appspot.com","apiKey":"AIzaSyDwgjK2pEX8mmlf3YT68PdNxaocU2bp51I","authDomain":"icross-v2.firebaseapp.com","messagingSenderId":"623228260695"}))), importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
