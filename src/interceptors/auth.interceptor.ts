import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token from localStorage
  const authService = inject(AuthService);
  const token = authService.getToken();
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authService.clearToken();
          console.warn('Token expired or invalid. Please login again.');
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
