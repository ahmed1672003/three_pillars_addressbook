import { UpdateDepartmentRequest } from './../models/departments';
import { environment } from './../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateDepartmentRequest, Department } from '../models/departments';
import { PagedResponseOf, ResponseOf } from '../models/shared';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _httClient: HttpClient) { }

  addDepartment(department: CreateDepartmentRequest): Observable<ResponseOf<Department>> {
    return this._httClient.post<ResponseOf<Department>>(`${environment.apiUrl}/department`, department);
  }

  updateDepartment(newDepartment: UpdateDepartmentRequest): Observable<ResponseOf<Department>> {
    return this._httClient.put<ResponseOf<Department>>(`${environment.apiUrl}/department`, newDepartment);
  }

  deleteDepartmentById(id: number): Observable<Response> {
    return this._httClient.delete<Response>(`${environment.apiUrl}/department/${id}`);
  }

  getDepartmentById(id: number): Observable<ResponseOf<Department>> {
    return this._httClient.get<ResponseOf<Department>>(`${environment.apiUrl}/department/${id}`);
  }

  paginateDepartments(pageIndex: number, pageSize: number): Observable<PagedResponseOf<Department[]>> {
    return this._httClient.get<PagedResponseOf<Department[]>>(
      `${environment.apiUrl}/department?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
}
