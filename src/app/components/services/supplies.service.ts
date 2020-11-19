import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SuppliesRequest } from '../../models/supplies-request';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}supplies/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}supplies/actualizar/${id}`, data);
  }
  cargarAllSupplies(){
    return this.http.get(`${this.URL_BASE}supplies/listar`);
  }
  cargarAllSupp(){
    return this.http.get(`${this.URL_BASE}supplies/listar`)
    .pipe(
      map ( this.crearArregloSupp)
    );
  }
  cargarAllSuppV(id: string){
    return this.http.get(`${this.URL_BASE}supplies/buscar/${id}`)
    .pipe(
      map ( this.crearArregloSupp)
    );
  }
  crearArregloSupp(contObj: object){
    const coti: SuppliesRequest[] = [];
    Object.keys( contObj ).forEach( key => {
      const cont: SuppliesRequest = contObj[key];
      coti.push(cont);
    });
    return coti;
  }
}
