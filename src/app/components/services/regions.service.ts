import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Regions } from '../../models/regions';
@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}regiones/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}regiones/actualizar/${id}`, data);
  }
  cargarAllRegionsV(){
    return this.http.get(`${this.URL_BASE}regiones/listar`)
    .pipe(
      map ( this.crearArregloRegions)
    );
  }
  cargarUniqueRegionV(id: string){
    return this.http.get(`${this.URL_BASE}regiones/buscarxpais/${id}`)
    .pipe(
      map ( this.crearArregloRegions)
    );
  }
  cargarAllRegiones(){
    return this.http.get(`${this.URL_BASE}regiones/listar`);
  }
  cargarUniqueRegion(id: string){
    return this.http.get(`${this.URL_BASE}regiones/buscar/${id}`)
    .pipe(
      map ( this.crearArregloRegions)
    );
  }
  crearArregloRegions(contObj: object){
    const region: Regions[] = [];
    Object.keys( contObj ).forEach( key => {
      const reg: Regions = contObj[key];
      region.push(reg);
    });
    return region;
  }
}
