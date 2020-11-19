import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UnitMeasurementRequest } from 'src/app/models/unit-measurement-request';

@Injectable({
  providedIn: 'root'
})
export class UmedidasService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}umedidas/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}umedidas/actualizar/${id}`, data);
  }
  cargarAllUMedidasV(){
    return this.http.get(`${this.URL_BASE}umedidas/listar`)
    .pipe(
      map ( this.crearArregloUMedidas)
    );
  }
  cargarUniqueUMedidaV(id: string){
    return this.http.get(`${this.URL_BASE}umedidas/buscar/${id}`)
    .pipe(
      map ( this.crearArregloUMedidas)
    );
  }
  cargarAllUMedidas(){
    return this.http.get(`${this.URL_BASE}umedidas/listar`);
  }
  cargarUniqueUMedida(id: string){
    return this.http.get(`${this.URL_BASE}umedidas/buscar/${id}`)
    .pipe(
      map ( this.crearArregloUMedidas)
    );
  }
  crearArregloUMedidas(contObj: object){
    const umed: UnitMeasurementRequest[] = [];
    Object.keys( contObj ).forEach( key => {
      const um: UnitMeasurementRequest = contObj[key];
      umed.push(um);
    });
    return umed;
  }
}
