import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getAnalytics } from "firebase/analytics";
import { getAnalytics as getAnalytics_alias, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAcpQZDs0NSPnFFPxf63zjH08SvOhA27so",
  authDomain: "gemini-clone-f22de.firebaseapp.com",
  projectId: "gemini-clone-f22de",
  storageBucket: "gemini-clone-f22de.appspot.com",
  messagingSenderId: "275605334876",
  appId: "1:275605334876:web:5ad336337ef097a3276f99",
  measurementId: "G-BF2W2H4B1V"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideAnimationsAsync(),
     provideHttpClient(withFetch()),
     provideFirebaseApp(() => initializeApp(firebaseConfig)),
     provideAuth(() => getAuth()),
     provideFirestore(() => getFirestore()),
     provideDatabase(() => getDatabase()),
     provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, provideFirestore(() => getFirestore())
   ],
 };
