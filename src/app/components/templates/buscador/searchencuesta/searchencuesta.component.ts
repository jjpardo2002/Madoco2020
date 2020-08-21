import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { EncuestasService } from '../../../services/encuestas.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { EncuestaModel } from '../../../../models/encuesta.model';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-searchencuesta',
  templateUrl: './searchencuesta.component.html',
  styleUrls: ['./searchencuesta.component.css']
})
export class SearchencuestaComponent implements OnInit {
  msg: string;
  lstEncuestas: Observable<any>;
  displayedColumns: string[] = ['id_enc', 'titulo_enc', 'detalle_enc', 'select'];
  searchText: string;
  p = 1;
  maxChars = 255;
  idError: number;
  idPk: number;
  ELEMENT_DATA: EncuestaModel[];
  ELEMENT_ITEM: EncuestaModel[];
  dataSource = new MatTableDataSource<EncuestaModel>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<EncuestaModel[]>;
  constructor(private listaService: EncuestasService) {
    this.envioDato = new EventEmitter<EncuestaModel[]>();
  }

  ngOnInit(): void {

    this.getEncuestas();
  }
  getEncuestas()
  {
    this.listaService.QueryRecordE().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        console.log(this.ELEMENT_DATA);
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });

    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  SearchRowData(id: any){
    this.idError = null;
    this.idPk = id;
    console.log(id);
    this.listaService.BuscarRegistro(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#exampleModal').modal('hide');
    });

  }
}
