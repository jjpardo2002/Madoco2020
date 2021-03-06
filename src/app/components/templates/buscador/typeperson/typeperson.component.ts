import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { TypePersons } from '../../../../models/typepersons';
import { TypePersonsService } from '../../../services/type-persons.service';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-typeperson',
  templateUrl: './typeperson.component.html',
  styleUrls: ['./typeperson.component.css']
})
export class TypepersonComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id', 'nombre', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: TypePersons[];
  dataSource = new MatTableDataSource<TypePersons>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<TypePersons[]>;
  constructor(private typepService: TypePersonsService) {
    this.envioDato = new EventEmitter();
    this.getTypePer();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTypePer()
  {
    this.typepService.cargarAllTypePersonV().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.typepService.cargarUniqueTypePersonV(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#btpersona').modal('hide');
    });
  }

}
