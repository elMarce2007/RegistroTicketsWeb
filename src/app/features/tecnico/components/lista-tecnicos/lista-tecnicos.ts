// src/app/features/tecnico/components/lista-tecnicos/lista-tecnicos.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TecnicoApiService } from '../../services/tecnico-api.service';

/**
 * ListaTecnicos
 * - Muestra la lista y permite eliminar.
 */
@Component({
  selector: 'lista-tecnicos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="space-y-4">
      <h1 class="text-2xl font-semibold">Técnicos</h1>

      <div class="bg-white rounded shadow">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="text-left p-3">ID</th>
              <th class="text-left p-3">Nombre</th>
              <th class="text-left p-3">Especialidad</th>
              <th class="text-right p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            @for (t of api.tecnicos(); track t.id) {
              <tr class="border-t">
                <td class="p-3">{{ t.id }}</td>
                <td class="p-3">{{ t.nombreTecnico }}</td>
                <td class="p-3">{{ t.especialidadTecnico }}</td>
                <td class="p-3 text-right">
                  <button
                    (click)="eliminar(t.id!)"
                    class="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            }

            @if (!api.tecnicos().length) {
              <tr>
                <td class="p-4 text-center text-gray-500" colspan="4">
                  Sin datos. Crea un técnico.
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export default class ListaTecnicos implements OnInit {
  // inyecta el servicio para lectura de señal y acciones
  api = inject(TecnicoApiService);

  // Carga inicial
  async ngOnInit(): Promise<void> {
    await this.api.reload();
  }

  // Elimina y refresca
  async eliminar(id: number): Promise<void> {
    await this.api.delete(id);
  }
}
