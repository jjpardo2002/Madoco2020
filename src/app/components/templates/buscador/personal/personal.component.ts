import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { PersonsService } from '../../../services/persons.service';
import { MiEmpleado } from '../../../../models/mi-empleado';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id', 'name', 'email', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: MiEmpleado[];
  dataSource = new MatTableDataSource<MiEmpleado>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<MiEmpleado[]>;
  constructor(private perService: PersonsService) {
    this.envioDato = new EventEmitter();
    this.getEmpleados();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getEmpleados()
  {
    this.perService.cargarEmpleados().subscribe(
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
    this.perService.BuscarRegistroEmp(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bpersonal').modal('hide');
    });

  }

}
