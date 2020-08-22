import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
// import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
// import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
// import { ContriesService } from '../../../services/contries.service';
import { Regions } from '../../../../models/regions';
import { RegionsService } from '../../../services/regions.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-bregion',
  templateUrl: './bregion.component.html',
  styleUrls: ['./bregion.component.css']
})
export class BregionComponent implements OnInit, AfterViewInit {
  msg: string;
  displayedColumns: string[] = ['id', 'nombre', 'select'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: Regions[];
  dataSource = new MatTableDataSource<Regions>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<Regions[]>;
  @Input() idPaisR: string;
  @Input() dtsRegiones: Regions[];
  constructor(private regionService: RegionsService) {
    this.envioDato = new EventEmitter();
    // this.getRegiones();
  }
  ngAfterViewInit() {
    this.getRegiones();
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;

  }
  getRegiones()
  {
      this.regionService.cargarUniqueRegionV(this.idPaisR).subscribe(
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
    this.regionService.cargarUniqueRegion(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bregiones').modal('hide');
    });
  }
}
