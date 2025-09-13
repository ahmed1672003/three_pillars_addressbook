import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    return localStorage.getItem('accessToken') ? true : false;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  clearToken(): void {
    localStorage.removeItem('accessToken');
  }
  setUserId(userId: number) {
    localStorage.setItem('userId', userId.toString());
  }
  clearUserId(): void {
    localStorage.removeItem('userId');
  }
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }

}
