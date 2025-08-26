import { Routes } from '@angular/router';
import {TECNICOS_ROUTES} from './features/tecnico/tecnicos.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/tecnicos', pathMatch: 'full' },
  { path: 'tecnicos', children: TECNICOS_ROUTES },
  { path: '**', redirectTo: '/tecnicos' }
];
