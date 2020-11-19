import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CotizacionRequest } from '../../models/cotizacion-request';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}cotizacion/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}cotizacion/actualizar/${id}`, data);
  }
  cargarAllCotizaciones(){
    return this.http.get(`${this.URL_BASE}cotizacion/listar`)
    .pipe(
      map ( this.crearArregloCotizacion)
    );
  }
  cargarUniqueCotizacion(id: number){
    return this.http.get(`${this.URL_BASE}cotizacion/buscar/${id}`)
    .pipe(
      map ( this.crearArregloCotizacion)
    );
  }
  cargarAllCotizacion(){
    return this.http.get(`${this.URL_BASE}cotizacion/listar`);
  }
  cargarUniqueCotizacionG(id: string){
    return this.http.get(`${this.URL_BASE}cotizacion/buscar/${id}`);
  }
  crearArregloCotizacion(contObj: object){
    const coti: CotizacionRequest[] = [];
    Object.keys( contObj ).forEach( key => {
      const cont: CotizacionRequest = contObj[key];
      coti.push(cont);
    });
    return coti;
  }
}
