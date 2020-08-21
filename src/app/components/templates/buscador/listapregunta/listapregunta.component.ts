import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { EncuestaModel } from '../../../../models/encuesta.model';
import { MatSort } from '@angular/material/sort';
import { PreguntaModel } from '../../../../models/pregunta.model';
import { QuestionsService } from '../../../services/questions.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-listapregunta',
  templateUrl: './listapregunta.component.html',
  styleUrls: ['./listapregunta.component.css']
})
export class ListapreguntaComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id', 'titulo', 'id_enc_fk'];
  searchText: string;
  p = 1;
  idError: number;
  idPk: number;
  ELEMENT_DATA: PreguntaModel[];
  ELEMENT_ITEM: PreguntaModel[];
  dataSource = new MatTableDataSource<PreguntaModel>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<PreguntaModel[]>;
  @Input() idEnc: number;
  constructor(private lstPregunta: QuestionsService) {
    this.getPreguntas(this.idEnc);
  }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getPreguntas(id: any)
  {
    this.lstPregunta.QueryRecordxEnc(id).subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        console.log(this.ELEMENT_DATA);
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idError = null;
    this.idPk = id;
    console.log(id);
    this.lstPregunta.BuscarRegistro(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#PreguntaModal').modal('hide');
    });

  }
}
