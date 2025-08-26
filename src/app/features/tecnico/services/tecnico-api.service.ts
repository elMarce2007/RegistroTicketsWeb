// src/app/features/tecnico/services/tecnico-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnico.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TecnicoApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${this.baseUrl}/tecnicos`);
  }

  getById(id: number): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${this.baseUrl}/tecnicos/${id}`);
  }

  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${this.baseUrl}/tecnicos`, tecnico);
  }

  update(id: number, tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${this.baseUrl}/tecnicos/${id}`, tecnico);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tecnicos/${id}`);
  }
}
