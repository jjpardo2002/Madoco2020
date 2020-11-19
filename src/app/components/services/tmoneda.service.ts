import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TmonedaService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  /*cargarAllUMedidas(){
    return this.http.get(`${this.URL_BASE}umedidas/listar`).pipe(
      map(results => JsonPipe)
    );
  }*/
  MonedasList(){
    return fetch(`${this.URL_BASE}tmoneda/listar`).then(response =>
      response.json()
      );
    // return this.http.get(`${this.URL_BASE}vistas/lstempresas`);
  }
  ListaMonedas(): Observable<any>{
    return this.http.get(`${this.URL_BASE}tmoneda/listar`)
    .pipe(
      map ( this.extractData)
    );
  }
  private extractData(res: Response)
  {
    // tslint:disable-next-line:prefer-const
    let body = res;
    return body || {};
  }

}
