// src/app/core/auth/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/enviroment';
import {Observable, of, tap} from 'rxjs';
import {AuthUtils} from '../auth.utils';


export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly apiUrl = `${environment.apiUrl}/public/api/auth`;

  /**
   * Realiza login y guarda el token en localStorage
   */
  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap((res) => {
        console.log('✅ Login exitoso, token recibido:', res.accessToken);

        // Guardamos tokens en localStorage
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('expiresIn', res.expiresIn.toString());
      })
    );
  }


  /**
   * Cierra sesión eliminando los tokens
   */
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiresIn');
    this.router.navigate(['/auth/login']);
  }

  /**
   * Devuelve el token actual (si existe)
   */
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Saber si hay sesión activa
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Verifica si el usuario está autenticado
   * (usado por los guards).
   */
  check() {
    const token = this.getToken();

    if (!token) {
      return of(false);
    }

    // Si el token está expirado
    if (AuthUtils.isTokenExpired(token)) {
      return of(false);
    }

    // Token válido
    return of(true);
  }
}
