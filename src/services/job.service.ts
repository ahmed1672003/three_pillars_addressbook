import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateJobRequest, Job, UpdateJobRequest } from '../models/jobs';
import { PagedResponseOf, ResponseOf, Response } from '../models/shared';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private _httpClient: HttpClient) { }


  addJob(job: CreateJobRequest): Observable<ResponseOf<Job>> {
    return this._httpClient.post<ResponseOf<Job>>(`${environment.apiUrl}/job`, job);
  }

  updateJob(newJob: UpdateJobRequest): Observable<ResponseOf<Job>> {
    return this._httpClient.put<ResponseOf<Job>>(`${environment.apiUrl}/job`, newJob);
  }

  deleteJobById(id: number): Observable<Response> {
    return this._httpClient.delete<Response>(`${environment.apiUrl}/job/${id}`);
  }

  getJobById(id: number): Observable<ResponseOf<Job>> {
    return this._httpClient.get<ResponseOf<Job>>(`${environment.apiUrl}/job/${id}`);
  }

  paginateJobs(pageIndex: number, pageSize: number): Observable<PagedResponseOf<Job[]>> {
    return this._httpClient.get<PagedResponseOf<Job[]>>(
      `${environment.apiUrl}/job?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }
}
