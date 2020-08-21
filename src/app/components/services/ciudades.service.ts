import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResDataModal } from '../../models/res-data-modal';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { States } from '../../models/states';
@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  getById(id: any): Observable<any>{
    return this.http.get(`${this.URL_BASE}/ciudades/listarbyid/${id}`);
  }
  getAlls(): Observable<any>{

    return this.http.get(`${this.URL_BASE}ciudades/listaciudades`);
  }
}
