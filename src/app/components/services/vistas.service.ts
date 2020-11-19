import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { VistaRequest } from '../../models/vista-request';

@Injectable({
  providedIn: 'root'
})
export class VistasService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  verInfoBimestre(): Observable<any>{
    return this.http.get(`${this.URL_BASE}vistas/indbimestre`);
  }
}
