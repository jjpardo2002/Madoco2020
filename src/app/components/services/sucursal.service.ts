import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SucursalRequest } from '../../models/sucursal-request';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}sucursales/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}sucursales/actualizar/${id}`, data);
  }
  cargarAllSuc(){
    return this.http.get(`${this.URL_BASE}sucursales/listar`);
  }
  cargarAllSucs(){
    return this.http.get(`${this.URL_BASE}sucursales/listar`)
    .pipe(
      map ( this.crearArregloSuc)
    );
  }
  cargarSuc(id: string){
    return this.http.get(`${this.URL_BASE}sucursales/buscar/${id}`)
    .pipe(
      map ( this.crearArregloSuc)
    );
  }
  crearArregloSuc(contObj: object){
    const suc: SucursalRequest[] = [];
    Object.keys( contObj ).forEach( key => {
      const sucursal: SucursalRequest = contObj[key];
      suc.push(sucursal);
    });
    return suc;
  }
}
