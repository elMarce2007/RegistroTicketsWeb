// src/app/features/tecnico/components/tecnico-form/tecnico-form.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TecnicoApiService } from '../../services/tecnico-api.service';
import { Tecnico } from '../../models/tecnico.interface';

/**
 * TecnicoForm
 * - Alta rápida con validación mínima.
 */
@Component({
  selector: 'tecnico-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="guardar()" class="bg-white p-4 rounded shadow space-y-3">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label class="block text-sm mb-1">Nombre</label>
          <input
            class="w-full border rounded p-2"
            formControlName="nombreTecnico"
            placeholder="Ej: Carlos Li"
          />
        </div>

        <div>
          <label class="block text-sm mb-1">Especialidad</label>
          <input
            class="w-full border rounded p-2"
            formControlName="especialidadTecnico"
            placeholder="Ej: Redes"
          />
        </div>

        <div>
          <label class="block text-sm mb-1">Usuario creación</label>
          <input
            class="w-full border rounded p-2"
            formControlName="usuarioCreacion"
            placeholder="admin"
          />
        </div>
      </div>

      <div class="flex gap-2">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          [disabled]="form.invalid || saving()"
        >
          {{ saving() ? 'Guardando…' : 'Guardar' }}
        </button>

        <button type="button" class="px-4 py-2 border rounded" (click)="reset()">
          Limpiar
        </button>
      </div>

      @if (msg()) {
        <p class="text-green-600 text-sm">{{ msg() }}</p>
      }
    </form>
  `,
})
export default class TecnicoForm {
  private fb = inject(FormBuilder);
  private api = inject(TecnicoApiService);

  // Estado UI
  msg = signal<string>('');
  saving = signal<boolean>(false);

  // Estructura estricta: evita TS2345 por null/undefined
  form = this.fb.nonNullable.group({
    nombreTecnico: this.fb.nonNullable.control<string>('', { validators: [Validators.required] }),
    especialidadTecnico: this.fb.nonNullable.control<string>('', { validators: [Validators.required] }),
    usuarioCreacion: this.fb.nonNullable.control<string>('admin'),
  });

  // Limpia sin perder usuario por defecto
  reset(): void {
    this.form.reset({
      nombreTecnico: '',
      especialidadTecnico: '',
      usuarioCreacion: 'admin',
    });
    this.msg.set('');
  }

  // Guarda y refresca lista
  async guardar(): Promise<void> {
    if (this.form.invalid) return;

    this.saving.set(true);
    this.msg.set('');
    try {
      const payload: Tecnico = this.form.getRawValue();
      await this.api.create(payload);
      this.msg.set('Técnico guardado correctamente.');
      this.reset();
    } finally {
      this.saving.set(false);
    }
  }
}
