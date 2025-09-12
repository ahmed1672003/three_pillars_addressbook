import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Stream } from '../models/streams';
import { ResponseOf } from '../models/shared';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private _httpClient: HttpClient) { }

  uploadStream(file: File): Observable<ResponseOf<Stream>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this._httpClient.post<ResponseOf<Stream>>(`${environment.apiUrl}/stream`, formData);
  }

  deleteStream(url: string): Observable<Response> {
    return this._httpClient.delete<Response>(`${environment.apiUrl}/stream`, { headers: { 'url': url } });
  }
}
