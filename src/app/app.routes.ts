import { Routes } from '@angular/router';
import MainLayout from './layout/components/main-layout/main-layout.component';
import TecnicoDashboard from './features/tecnico/pages/tecnico-dashboard/tecnico-dashboard';

export const routes: Routes = [
  // 👉 ruta inicial: al cargar la app te manda al login
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  // 👉 rutas principales (solo accesibles después del login)
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'tecnicos', component: TecnicoDashboard },
    ],
  },

  // 👉 módulo de autenticación (login, register, etc.)
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then(m => m.default),
  },

  // 👉 cualquier ruta desconocida redirige al login
  { path: '**', redirectTo: 'auth/login' },
];
