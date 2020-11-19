import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OcompraService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertOc(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}ordencompra/crear`, data);
  }
}
