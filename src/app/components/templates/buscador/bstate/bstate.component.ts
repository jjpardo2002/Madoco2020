import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
// import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
// import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { CiudadesService } from '../../../services/ciudades.service';
import { States } from 'src/app/models/states';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-bstate',
  templateUrl: './bstate.component.html',
  styleUrls: ['./bstate.component.css']
})
export class BstateComponent implements OnInit {
  msg: string;
  displayedColumns: string[] = ['id', 'nombre', 'select'];
  searchText: string;
  ELEMENT_DATA: States[];
  dataSource = new MatTableDataSource<States>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<States[]>;
  @Input() idRegion: string;
  constructor(private ciudadService: CiudadesService) {
    this.envioDato = new EventEmitter();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  getCiudades()
  {
      console.log(this.idRegion);
      this.ciudadService.getStateByRegion(this.idRegion).subscribe(
        resp => {
          this.ELEMENT_DATA = resp;
          this.dataSource.data = this.ELEMENT_DATA;
          this.table.renderRows();
        });

    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  SearchRowData(id: string){
    console.log('Idddd ' + id);
    this.ciudadService.getUniqueStateV(id).subscribe(resp => {
      console.log(resp);
      this.envioDato.emit(resp);
      $('#bciudades').modal('hide');
    });
  }

}
