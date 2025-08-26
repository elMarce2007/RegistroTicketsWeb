// src/app/app.routes.ts
import { Routes } from '@angular/router';
import MainLayout from './layout/components/main-layout/main-layout.component';
import TecnicoDashboard from './features/tecnico/pages/tecnico-dashboard/tecnico-dashboard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'tecnicos', pathMatch: 'full' },
      { path: 'tecnicos', component: TecnicoDashboard },
      { path: '**', redirectTo: 'tecnicos' },
    ],
  },
];
