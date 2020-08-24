import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { TypePersons } from '../../models/typepersons';

@Injectable({
  providedIn: 'root'
})
export class TypePersonsService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}tipopersona/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}tipopersona/actualizar/${id}`, data);
  }
  cargarAllTypePersonV(){
    return this.http.get(`${this.URL_BASE}tipopersona/listar`)
    .pipe(
      map ( this.crearArregloTipoPersona)
    );
  }
  cargarUniqueTypePersonV(id: string){
    return this.http.get(`${this.URL_BASE}tipopersona/buscar/${id}`)
    .pipe(
      map ( this.crearArregloTipoPersona)
    );
  }
  cargarAllTypePerson(){
    return this.http.get(`${this.URL_BASE}tipopersona/listar`);
  }
  cargarUniqueTypePerson(id: string){
    return this.http.get(`${this.URL_BASE}tipopersona/buscar/${id}`)
    .pipe(
      map ( this.crearArregloTipoPersona)
    );
  }
  crearArregloTipoPersona(contObj: object){
    const typeperson: TypePersons[] = [];
    Object.keys( contObj ).forEach( key => {
      const typep: TypePersons = contObj[key];
      typeperson.push(typep);
    });
    return typeperson;
  }
}
