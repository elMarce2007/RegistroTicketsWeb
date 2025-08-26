// src/app/features/tecnico/pages/tecnico-dashboard/tecnico-dashboard.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import TecnicoForm from '../../components/tecnico-form/tecnico-form';
import ListaTecnicos from '../../components/lista-tecnicos/lista-tecnicos';

/**
 * TecnicoDashboard
 * - Combina formulario arriba y lista abajo (estilo “employee” del profe).
 */
@Component({
  selector: 'tecnico-dashboard',
  standalone: true,
  imports: [CommonModule, TecnicoForm, ListaTecnicos],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Gestión de Técnicos</h1>
      </div>

      <tecnico-form></tecnico-form>

      <lista-tecnicos></lista-tecnicos>
    </div>
  `,
})
export default class TecnicoDashboard {}
