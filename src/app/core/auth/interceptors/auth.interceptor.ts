// src/app/core/auth/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    console.log('📌 Usando token en petición:', req.url);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  console.warn('⚠️ No se encontró token para la request:', req.url);
  return next(req);
};
