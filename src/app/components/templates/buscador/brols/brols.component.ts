import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { Rols } from 'src/app/models/rols';
import { RolsService } from 'src/app/components/services/rols.service';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-brols',
  templateUrl: './brols.component.html',
  styleUrls: ['./brols.component.css']
})
export class BrolsComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id', 'nombre', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: Rols[];
  dataSource = new MatTableDataSource<Rols>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<Rols[]>;
  constructor(private rolsService: RolsService) {
    this.envioDato = new EventEmitter();
    this.getRols();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getRols()
  {
    this.rolsService.cargarAllRolesV().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.rolsService.cargarUniqueRolV(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#broles').modal('hide');
    });
  }

}
