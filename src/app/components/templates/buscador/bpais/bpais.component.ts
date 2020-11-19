import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { CountriesRequest } from '../../../../models/countries-request';
import { ContriesService } from '../../../services/contries.service';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-bpais',
  templateUrl: './bpais.component.html',
  styleUrls: ['./bpais.component.css']
})
export class BpaisComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id', 'nombre', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: CountriesRequest[];
  dataSource = new MatTableDataSource<CountriesRequest>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<CountriesRequest[]>;
  constructor(private countriService: ContriesService) {
    this.envioDato = new EventEmitter();
    this.getPaises();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getPaises()
  {
    this.countriService.cargarAllPaisesV().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.countriService.cargarUniquePaisV(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bpaises').modal('hide');
    });
  }

}
