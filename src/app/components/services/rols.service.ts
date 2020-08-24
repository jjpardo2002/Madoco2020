import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Rols } from '../../models/rols';

@Injectable({
  providedIn: 'root'
})
export class RolsService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}roles/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}roles/actualizar/${id}`, data);
  }
  cargarAllRolesV(){
    return this.http.get(`${this.URL_BASE}roles/listar`)
    .pipe(
      map ( this.crearArregloRoles)
    );
  }
  cargarUniqueRolV(id: string){
    return this.http.get(`${this.URL_BASE}roles/buscar/${id}`)
    .pipe(
      map ( this.crearArregloRoles)
    );
  }
  cargarAllRegiones(){
    return this.http.get(`${this.URL_BASE}roles/listar`);
  }
  cargarUniqueRol(id: string){
    return this.http.get(`${this.URL_BASE}regiones/buscar/${id}`)
    .pipe(
      map ( this.crearArregloRoles)
    );
  }
  crearArregloRoles(contObj: object){
    const roles: Rols[] = [];
    Object.keys( contObj ).forEach( key => {
      const rol: Rols = contObj[key];
      roles.push(rol);
    });
    return roles;
  }
}
