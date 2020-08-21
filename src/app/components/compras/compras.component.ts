import { Component, OnInit } from '@angular/core';
import { MenuService, OpcionSubmenu } from '../services/menu.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  tarjetas: OpcionSubmenu[] = [];
  constructor(private menuSer: MenuService,
              private rutas: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.buscarCard();
  }
  buscarCard()
  {
    this.tarjetas = this.menuSer.getCompras();
  }
  irA(pagina: string)
  {
    this.rutas.navigateByUrl(pagina);
  }
  buscarModulo(termino: string)
  {
    this.tarjetas = this.menuSer.getCompras();
  }
}
