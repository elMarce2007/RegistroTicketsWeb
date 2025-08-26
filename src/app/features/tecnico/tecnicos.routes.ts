import { Routes } from '@angular/router';
import { TecnicoListComponent } from './components/tecnico-list/tecnico-list.component';
import { TecnicoFormComponent } from './components/tecnico-form/tecnico-form.component';

export const TECNICOS_ROUTES: Routes = [
  { path: '', component: TecnicoListComponent },
  { path: 'nuevo', component: TecnicoFormComponent },
  { path: 'editar/:id', component: TecnicoFormComponent },
];
