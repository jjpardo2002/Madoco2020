import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { PreguntaModel } from '../../models/pregunta.model';
@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}pregunta/crearlotes`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}pregunta/actualizar/${id}`, data);
  }
  BuscarRegistro(id: any){
    return this.http.get(`${this.URL_BASE}pregunta/buscar/${id}`).pipe(
      map ( this.crearArreglo)
    );
  }
  QueryRecord(): Observable<any>{
    return this.http.get(`${this.URL_BASE}pregunta/listar`);
  }
  DeleteRecord(id: any): Observable<any>{
    return this.http.delete(`${this.URL_BASE}pregunta/eliminar/${id}`);
  }

  QueryRecordE(){
    return this.http.get(`${this.URL_BASE}pregunta/listar`)
    .pipe(
      map ( this.crearArreglo)
    );
  }
  QueryRecordxEnc(id: any){
    return this.http.get(`${this.URL_BASE}pregunta/buscar/${id}`)
    .pipe(
      map ( this.crearArreglo)
    );
  }
  crearArreglo(encuestaObj: object){
    const pregunta: PreguntaModel[] = [];
    Object.keys( encuestaObj ).forEach( key => {
      const enc: PreguntaModel = encuestaObj[key];
      pregunta.push(enc);
    });
    // if (encuestaObj === null) { return []; }
    return pregunta;
  }
}
