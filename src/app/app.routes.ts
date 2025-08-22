import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tecnicos', pathMatch: 'full' },
  {
    path: 'tecnicos',
    loadChildren: () =>
      import('./features/tecnicos/tecnicos.routes').then(m => m.TECNICOS_ROUTES)
  },
  { path: '**', redirectTo: 'not-found' }
];
