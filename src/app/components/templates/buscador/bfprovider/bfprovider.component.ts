import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { FproviderRequest } from '../../../../models/fprovider-request';
import { FproviderService } from 'src/app/components/services/fprovider.service';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-bfprovider',
  templateUrl: './bfprovider.component.html',
  styleUrls: ['./bfprovider.component.css']
})
export class BfproviderComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id_fpr', 'nombre_fpr', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: FproviderRequest[];
  dataSource = new MatTableDataSource<FproviderRequest>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<FproviderRequest[]>;
  constructor(private fprovService: FproviderService) {
    this.envioDato = new EventEmitter();
    this.getFprov();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getFprov()
  {
    this.fprovService.cargarFProvider().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.fprovService.BuscarRegistro(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bfprovider').modal('hide');
    });
  }

}
