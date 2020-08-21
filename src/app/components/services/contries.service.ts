import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CountriesRequest } from 'src/app/models/countries-request';

@Injectable({
  providedIn: 'root'
})
export class ContriesService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}paises/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}paises/actualizar/${id}`, data);
  }
  cargarAllPaisesV(){
    return this.http.get(`${this.URL_BASE}paises/listar`)
    .pipe(
      map ( this.crearArregloPais)
    );
  }
  cargarUniquePaisV(id: string){
    return this.http.get(`${this.URL_BASE}paises/buscar/${id}`)
    .pipe(
      map ( this.crearArregloPais)
    );
  }
  cargarAllPaises(){
    return this.http.get(`${this.URL_BASE}paises/listar`);
  }
  cargarUniquePais(id: string){
    return this.http.get(`${this.URL_BASE}paises/buscar/${id}`);
  }
  crearArregloPais(contObj: object){
    const contrie: CountriesRequest[] = [];
    Object.keys( contObj ).forEach( key => {
      const cont: CountriesRequest = contObj[key];
      contrie.push(cont);
    });
    return contrie;
  }
}
