import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MiCliente } from '../../../../models/mi-cliente';
import { PersonsService } from '../../../services/persons.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id', 'name', 'email', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: MiCliente[];
  dataSource = new MatTableDataSource<MiCliente>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<MiCliente[]>;

  constructor(private perService: PersonsService) {
    this.envioDato = new EventEmitter();
    this.getClientes();
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getClientes()
  {
    this.perService.cargarClientes().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idPk = id;
    console.log(id);
    this.perService.BuscarRegistroCli(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bclientes').modal('hide');
    });
  }
}
