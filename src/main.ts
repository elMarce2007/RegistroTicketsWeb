// src/main.ts
// Bootstrap standalone + Router + HttpClient
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      // Agrega interceptores globales aquí si luego los necesitas
      withInterceptors([])
    ),
  ],
}).catch(console.error);
