import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { EncuestasService } from '../../services/encuestas.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { EncuestaModel } from '../../../models/encuesta.model';
import { MatSort } from '@angular/material/sort';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  lstEncuestas: Observable<any>;
  displayedColumns: string[] = ['id_enc', 'titulo_enc', 'detalle_enc'];
  searchText: string;
  p = 1;
  ELEMENT_DATA: EncuestaModel[];
  dataSource = new MatTableDataSource<EncuestaModel>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private listaService: EncuestasService) {
    this.getEncuestas();

  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEncuestas()
  {
    this.listaService.QueryRecordE().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        console.log(this.ELEMENT_DATA);
        this.dataSource.data = this.ELEMENT_DATA;
      });

    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  seleccion(): void
  {

  }
}
