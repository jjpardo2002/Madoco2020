import { Component, OnInit } from '@angular/core';
import { MenuService, OpcionSubmenu } from '../../services/menu.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  opciones: OpcionSubmenu[] = [];
  constructor(private menuService: MenuService,
              private rutas: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.opciones = this.menuService.getOpcionesEncuesta();
  }
  irA(pagina: string)
  {
    this.rutas.navigateByUrl(pagina);
  }
}
