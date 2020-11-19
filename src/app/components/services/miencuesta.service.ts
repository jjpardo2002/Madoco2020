import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { MiEncuestas } from '../../models/mi-encuestas';

@Injectable({
  providedIn: 'root'
})
export class MiencuestaService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) {
  }
  cargarEncuestas(){
    return this.http.get<MiEncuestas>(`${this.URL_BASE}pregunta/listaprerta`);
  }
  InsertEncuesta(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}pool/crear`, data);
  }
}
