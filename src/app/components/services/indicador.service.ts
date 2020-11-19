import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IndicadorRequest } from '../../models/indicador-request';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}indicador/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}indicador/actualizar/${id}`, data);
  }
  BorrarRecord(id: any): Observable<any>{
    return this.http.delete(`${this.URL_BASE}indicador/eliminar/${id}`);
  }
  cargarAllImetas(){
    return this.http.get(`${this.URL_BASE}indicador/listar`)
    .pipe(
      map ( this.crearArregloIndicador)
    );
  }
  cargarUniqueIndicador(id: number){
    return this.http.get(`${this.URL_BASE}indicador/buscar/${id}`)
    .pipe(
      map ( this.crearArregloIndicador)
    );
  }
  cargarAllIndicador(){
    return this.http.get(`${this.URL_BASE}indicador/listar`);
  }
  cargarUniqueImetas(id: string){
    return this.http.get(`${this.URL_BASE}indicador/buscar/${id}`);
  }
  crearArregloIndicador(contObj: object){
    const imet: IndicadorRequest[] = [];
    Object.keys( contObj ).forEach( key => {
      const im: IndicadorRequest = contObj[key];
      imet.push(im);
    });
    return imet;
  }
}
