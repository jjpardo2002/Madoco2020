import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { UnitMeasurementRequest } from '../../../../models/unit-measurement-request';
import { UmedidasService } from '../../../../components/services/umedidas.service';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-umedida',
  templateUrl: './umedida.component.html',
  styleUrls: ['./umedida.component.css']
})
export class UmedidaComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id', 'nombre', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: UnitMeasurementRequest[];
  dataSource = new MatTableDataSource<UnitMeasurementRequest>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<UnitMeasurementRequest[]>;
  constructor(private umService: UmedidasService) {
    this.envioDato = new EventEmitter();
    this.getUMedidas();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getUMedidas()
  {
    this.umService.cargarAllUMedidasV().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.umService.cargarUniqueUMedidaV(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bumedida').modal('hide');
    });
  }
}
