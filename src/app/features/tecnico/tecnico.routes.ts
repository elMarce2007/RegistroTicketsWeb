// tecnico.authentication.routes.ts
import { Routes } from '@angular/router';
import ListaTecnicos from './components/lista-tecnicos/lista-tecnicos';
import TecnicoForm from './components/tecnico-form/tecnico-form';

export const TECNICO_ROUTES: Routes = [
  { path: '', component: ListaTecnicos },
  { path: 'nuevo', component: TecnicoForm }
];

