import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QcotizacionService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }

  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}qcotizacion/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}qcotizacion/actualizar/${id}`, data);
  }
  cargarAllCauQC(){
    return this.http.get(`${this.URL_BASE}qcotizacion/listar`);
  }
}
