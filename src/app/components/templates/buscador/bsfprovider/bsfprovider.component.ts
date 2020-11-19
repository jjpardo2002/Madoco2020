import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { SfproviderRequest } from '../../../../models/sfprovider-request';
import { SfproviderService } from '../../../services/sfprovider.service';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-bsfprovider',
  templateUrl: './bsfprovider.component.html',
  styleUrls: ['./bsfprovider.component.css']
})
export class BsfproviderComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id_fpr', 'nombre_fpr', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: SfproviderRequest[];
  dataSource = new MatTableDataSource<SfproviderRequest>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<SfproviderRequest[]>;
  constructor(private sfprovService: SfproviderService) {
    this.envioDato = new EventEmitter();
    this.getSFprov();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getSFprov()
  {
    this.sfprovService.cargarSFProvider().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.sfprovService.BuscarRegistro(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bsfprovider').modal('hide');
    });
  }

}
