import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResDataModal } from '../../models/res-data-modal';
import { Observable } from 'rxjs';
import { Countries } from '../../models/countries';
import { environment } from '../../../environments/environment';
import { Select2OptionData } from 'ng-select2';
@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  URL_BASE = environment.API_URL;
  constructor(private http: HttpClient) { }
  getPaises(): Observable<Countries[]>{
   return this.http.get<Countries[]>('http://localhost:8080/apimadoco/paises/getallpaises');
  }
  getPaisesV(): Observable<Select2OptionData>{
    return this.http.get<Select2OptionData>('http://localhost:8080/apimadoco/paises/getallpaises');
   }
}
