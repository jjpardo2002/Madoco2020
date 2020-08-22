import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResDataModal } from '../../models/res-data-modal';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { States } from '../../models/states';
import { map } from 'rxjs/operators';

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
  getAllStates(){
    return this.http.get(`${this.URL_BASE}ciudades/listaciudades`)
    .pipe(
      map ( this.crearArregloCiudades)
    );
  }
  getUniqueStateV(id: string){
    return this.http.get(`${this.URL_BASE}ciudades/getciudad/${id}`)
    .pipe(
      map ( this.crearArregloCiudades)
    );
  }
  getStateByRegion(id: string){
    return this.http.get(`${this.URL_BASE}ciudades/listarbyregion/${id}`)
    .pipe(
      map ( this.crearArregloCiudades)
    );
  }
  crearArregloCiudades(contObj: object){
    const state: States[] = [];
    Object.keys( contObj ).forEach( key => {
      const states: States = contObj[key];
      state.push(states);
    });
    return state;
  }
}
