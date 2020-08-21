import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MiEmpleado } from '../../models/mi-empleado';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MiCliente } from '../../models/mi-cliente';
@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
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
  BuscarRegistroCli(id: any){
    return this.http.get(`${this.URL_BASE}personas/buscar/${id}`).pipe(
      map ( this.crearArregloCust)
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
}
