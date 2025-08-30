// src/app/features/tecnico/services/tecnico-api.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tecnico } from '../models/tecnico.interface';
import { firstValueFrom } from 'rxjs';
import {environment} from '../../../../environments/enviroment';

/**
 * TecnicoApiService
 * - Encapsula llamadas REST y un cache simple con señal + reload().

 * - Patrón similar a “employee service” del profe (estilo dashboard).
 */
// src/app/features/tecnico/services/tecnico-api.service.ts
@Injectable({ providedIn: 'root' })
export class TecnicoApiService {
  private http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/tecnicos`;

  // Cache en memoria para render inmediato
  private _tecnicos = signal<Tecnico[]>([]);
  // Exponemos solo lectura
  tecnicos = this._tecnicos.asReadonly();

  /**
   * Carga/recarga la lista desde la API y actualiza la señal.
   */
  async reload(): Promise<void> {
    // Mantén la IU responsiva con actualizaciones atómicas
    const data = await firstValueFrom(this.http.get<Tecnico[]>(this.base));
    this._tecnicos.set(data);
  }

  /**
   * Crea un técnico y refresca la lista.
   */
  async create(payload: Tecnico): Promise<Tecnico> {
    const created = await firstValueFrom(this.http.post<Tecnico>(this.base, payload));
    await this.reload();
    return created;
  }

  /**
   * Actualiza un técnico y refresca la lista.
   */
  async update(id: number, payload: Tecnico): Promise<Tecnico> {
    const updated = await firstValueFrom(this.http.put<Tecnico>(`${this.base}/${id}`, payload));
    await this.reload();
    return updated;
  }

  /**
   * Elimina un técnico y refresca la lista.
   */
  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.base}/${id}`));
    await this.reload();
  }
}
