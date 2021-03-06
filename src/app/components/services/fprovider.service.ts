import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResDataModal } from '../../models/res-data-modal';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { FproviderRequest } from '../../models/fprovider-request';

@Injectable({
  providedIn: 'root'
})
export class FproviderService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}t_featureproveedor/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}t_featureproveedor/actualizar/${id}`, data);
  }
  cargarFProvider(){
    return this.http.get(`${this.URL_BASE}t_featureproveedor/listar`)
    .pipe(
      map ( this.crearArregloFProv)
    );
  }
  BuscarRegistro(id: any){
    return this.http.get(`${this.URL_BASE}t_featureproveedor/buscar/${id}`).pipe(
      map ( this.crearArregloFProv)
    );
  }
  crearArregloFProv(custObj: object){
    const fprov: FproviderRequest[] = [];
    Object.keys( custObj ).forEach( key => {
      const provf: FproviderRequest = custObj[key];
      fprov.push(provf);
    });
    return fprov;
  }
}
