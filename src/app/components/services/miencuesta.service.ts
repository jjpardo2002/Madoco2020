import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
}
