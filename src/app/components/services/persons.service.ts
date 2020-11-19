import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MiEmpleado } from '../../models/mi-empleado';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MiCliente } from '../../models/mi-cliente';
import { ProveedorRequest } from '../../models/proveedor-request';
@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  InsertRecord(data: any): Observable<any>{
    return this.http.post(`${this.URL_BASE}personas/crear`, data);
  }
  UpdateRecord(id: any, data: any): Observable<any>{
    return this.http.put(`${this.URL_BASE}personas/actualizar/${id}`, data);
  }
  cargarEmpleados(){
    return this.http.get(`${this.URL_BASE}personas/empleado`)
    .pipe(
      map ( this.crearArregloEmp)
    );
  }
  crearArregloEmp(empObj: object){
    const encuesta: MiEmpleado[] = [];
    Object.keys( empObj ).forEach( key => {
      const emp: MiEmpleado = empObj[key];
      encuesta.push(emp);
    });
    return encuesta;
  }
  BuscarRegistroEmp(id: any){
    return this.http.get(`${this.URL_BASE}personas/buscar/${id}`).pipe(
      map ( this.crearArregloEmp)
    );
  }
  cargarClientes(){
    return this.http.get(`${this.URL_BASE}personas/cliente`)
    .pipe(
      map ( this.crearArregloCust)
    );
  }
  cargarProveedores(){
    return this.http.get(`${this.URL_BASE}personas/proveedor`)
    .pipe(
      map ( this.crearArregloProveedor)
    );
  }
  BuscarRegistroCli(id: any){
    return this.http.get(`${this.URL_BASE}personas/buscar/${id}`).pipe(
      map ( this.crearArregloCust)
    );
  }
  BuscarRegistroProv(id: any){
    return this.http.get(`${this.URL_BASE}personas/buscar/${id}`).pipe(
      map ( this.crearArregloProveedor)
    );
  }
  crearArregloCust(custObj: object){
    const encuesta: MiCliente[] = [];
    Object.keys( custObj ).forEach( key => {
      const customer: MiCliente = custObj[key];
      encuesta.push(customer);
    });
    return encuesta;
  }
  crearArregloProveedor(custObj: object){
    const prov: ProveedorRequest[] = [];
    Object.keys( custObj ).forEach( key => {
      const proveedor: ProveedorRequest = custObj[key];
      prov.push(proveedor);
    });
    return prov;
  }
}
