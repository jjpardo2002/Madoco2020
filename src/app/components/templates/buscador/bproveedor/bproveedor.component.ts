import { PersonsService } from './../../../services/persons.service';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { ProveedorRequest } from '../../../../models/proveedor-request';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-bproveedor',
  templateUrl: './bproveedor.component.html',
  styleUrls: ['./bproveedor.component.css']
})
export class BproveedorComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id', 'name', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: ProveedorRequest[];
  dataSource = new MatTableDataSource<ProveedorRequest>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<ProveedorRequest[]>;
  constructor(private personService: PersonsService) {
    this.envioDato = new EventEmitter();
    this.getProveedores();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getProveedores()
  {
    this.personService.cargarProveedores().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.personService.BuscarRegistroProv(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bproveedor').modal('hide');
    });
  }
}
