import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { EncuestaModel } from '../../models/encuesta.model';


@Injectable({
  providedIn: 'root'
})
export class EncuestasService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}encuesta/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}encuesta/actualizar/${id}`, data);
  }
  BuscarRegistro(id: any){
    return this.http.get(`${this.URL_BASE}encuesta/buscar/${id}`).pipe(
      map ( this.crearArreglo)
    );
  }
  QueryRecord(): Observable<any>{
    return this.http.get(`${this.URL_BASE}encuesta/listar`);
  }
  DeleteRecord(id: any): Observable<any>{
    return this.http.delete(`${this.URL_BASE}encuesta/eliminar/${id}`);
  }

  QueryRecordE(){
    return this.http.get(`${this.URL_BASE}encuesta/listar`)
    .pipe(
      map ( this.crearArreglo)
    );
  }
  crearArreglo(encuestaObj: object){
    const encuesta: EncuestaModel[] = [];
    Object.keys( encuestaObj ).forEach( key => {
      const enc: EncuestaModel = encuestaObj[key];
      encuesta.push(enc);
    });
    // if (encuestaObj === null) { return []; }
    return encuesta;
  }

}
