import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CausaRechazoRequest } from '../../models/causa-rechazo-request';

@Injectable({
  providedIn: 'root'
})
export class CausarechazoService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}causarechazo/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}causarechazo/actualizar/${id}`, data);
  }
  cargarAllCauReJson(){
    return fetch(`${this.URL_BASE}causarechazo/listarjson`).then(response =>
      response.json()
      );
    // return this.http.get(`${this.URL_BASE}vistas/lstempresas`);
  }
  cargarAllCauReV(){
    return this.http.get(`${this.URL_BASE}causarechazo/listar`)
    .pipe(
      map ( this.crearArregloCausaRechazo)
    );
  }
  cargarUniqueCauReV(id: number){
    return this.http.get(`${this.URL_BASE}causarechazo/buscar/${id}`)
    .pipe(
      map ( this.crearArregloCausaRechazo)
    );
  }
  cargarAllCauRe(){
    return this.http.get(`${this.URL_BASE}causarechazo/listar`);
  }
  cargarUniqueCauRe(id: string){
    return this.http.get(`${this.URL_BASE}causarechazo/buscar/${id}`);
  }
  crearArregloCausaRechazo(contObj: object){
    const caure: CausaRechazoRequest[] = [];
    Object.keys( contObj ).forEach( key => {
      const cont: CausaRechazoRequest = contObj[key];
      caure.push(cont);
    });
    return caure;
  }
}
