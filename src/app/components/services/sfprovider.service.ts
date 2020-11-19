import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResDataModal } from '../../models/res-data-modal';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { SfproviderRequest } from '../../models/sfprovider-request';
@Injectable({
  providedIn: 'root'
})
export class SfproviderService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}s_featureproveedor/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}s_featureproveedor/actualizar/${id}`, data);
  }
  cargarSFProvider(){
    return this.http.get(`${this.URL_BASE}s_featureproveedor/listar`)
    .pipe(
      map ( this.crearArregloSFProv)
    );
  }
  BuscarRegistro(id: any){
    return this.http.get(`${this.URL_BASE}s_featureproveedor/buscar/${id}`).pipe(
      map ( this.crearArregloSFProv)
    );
  }
  crearArregloSFProv(custObj: object){
    const sfprov: SfproviderRequest[] = [];
    Object.keys( custObj ).forEach( key => {
      const provfs: SfproviderRequest = custObj[key];
      sfprov.push(provfs);
    });
    return sfprov;
  }
}
