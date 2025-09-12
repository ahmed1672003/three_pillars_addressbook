import { UpdateDepartmentRequest } from './../models/departments';
import { environment } from './../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResponseOf, ResponseOf } from '../models/shared';
import { AuthRequest, AuthResponse, RegisterUserRequest, UpdateUserRequest, User } from '../models/users';
import { Stream } from '../models/streams';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private _httpClient: HttpClient) { }
  registerUser(user: RegisterUserRequest): Observable<ResponseOf<AuthResponse>> {
    return this._httpClient.post<ResponseOf<AuthResponse>>(`${environment.apiUrl}/user`, user);
  }

  loginUser(authRequest: AuthRequest): Observable<ResponseOf<AuthResponse>> {
    return this._httpClient.put<ResponseOf<AuthResponse>>(`${environment.apiUrl}/user/auth`, authRequest);
  }

  updateUser(user: UpdateUserRequest): Observable<ResponseOf<User>> {
    return this._httpClient.put<ResponseOf<User>>(`${environment.apiUrl}/user`, user);
  }

  deleteUserById(id: number): Observable<Response> {
    return this._httpClient.delete<Response>(`${environment.apiUrl}/user/${id}`);
  }

  getUserById(id: number): Observable<ResponseOf<User>> {
    return this._httpClient.get<ResponseOf<User>>(`${environment.apiUrl}/user/${id}`);
  }

  paginateUsers(pageIndex: number, pageSize: number): Observable<PagedResponseOf<User[]>> {
    return this._httpClient.get<PagedResponseOf<User[]>>(
      `${environment.apiUrl}/user?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  exportToExcel(): Observable<ResponseOf<Stream>> {
    return this._httpClient.get<ResponseOf<Stream>>(`${environment.apiUrl}/user/xlsx`);
  }
}
