import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tecnico } from '../models/tecnicos.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TecnicosApiService {
  private baseUrl = `${environment.apiUrl}/tecnicos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(this.baseUrl);
  }

  obtener(id: number): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${this.baseUrl}/${id}`);
  }

  crear(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(this.baseUrl, tecnico);
  }

  actualizar(id: number, tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${this.baseUrl}/${id}`, tecnico);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
