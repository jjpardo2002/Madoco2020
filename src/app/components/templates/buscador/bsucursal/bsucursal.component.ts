import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { SucursalRequest } from 'src/app/models/sucursal-request';
import { SucursalService } from 'src/app/components/services/sucursal.service';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-bsucursal',
  templateUrl: './bsucursal.component.html',
  styleUrls: ['./bsucursal.component.css']
})
export class BsucursalComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['nit', 'nombre', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: SucursalRequest[];
  dataSource = new MatTableDataSource<SucursalRequest>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<SucursalRequest[]>;
  constructor(private sucursalService: SucursalService) {
    this.envioDato = new EventEmitter();
    this.getSucursales();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getSucursales()
  {
    this.sucursalService.cargarAllSucs().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.sucursalService.cargarSuc(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bsucursal').modal('hide');
    });
  }

}
