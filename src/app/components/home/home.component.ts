import { Component, OnInit } from '@angular/core';
import { MenuService, OpcionMenus } from '../services/menu.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  cuerpo = 'Prueba';
  estado = true;
  opciones: OpcionMenus[] = [];
  paises: any[] = [];
  constructor(private menuService: MenuService,
              private rutas: Router,
              private http: HttpClient) {

      this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe( (resp: any) => {
          this.paises = resp;
          console.log(resp);
        });

  }

  ngOnInit(): void {
    this.opciones = this.menuService.getOpciones();
    console.log(this.opciones);
  }
  irA(pagina: string)
  {
    this.rutas.navigateByUrl(pagina);
  }
  ocultar(ctrl: any)
  {
      if (document.getElementById(ctrl).hidden === false)
      {
          document.getElementById(ctrl).hidden = true;
      }else{
          document.getElementById(ctrl).hidden = false;
      }
  }


}
