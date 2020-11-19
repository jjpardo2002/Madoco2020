import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
// import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { SuppliesRequest } from '../../../../models/supplies-request';
import { SuppliesService } from '../../../../components/services/supplies.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-bsupplies',
  templateUrl: './bsupplies.component.html',
  styleUrls: ['./bsupplies.component.css']
})
export class BsuppliesComponent implements OnInit {
  idPk: string;
    /*
      Carga Supplies
    */
   displayedColumnsSupp: string[] = ['id', 'item', 'select'];
   searchText: string;
   ELEMENT_DATASUPP: SuppliesRequest[];
   dataSourcesupp = new MatTableDataSource<SuppliesRequest>();
   @ViewChild(MatTable, {static: true}) table: MatTable<any>;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   // ******* Fin Supplies
   @Output() envioDato: EventEmitter<SuppliesRequest[]>;

  constructor(private suppService: SuppliesService) {
    this.envioDato = new EventEmitter();
    this.getSupplies();
  }

  ngOnInit(): void {
    this.dataSourcesupp.paginator = this.paginator;
    this.dataSourcesupp.paginator.pageSize = 10;
  }
  getSupplies()
  {
      this.suppService.cargarAllSupp().subscribe(
        resp => {
          this.ELEMENT_DATASUPP = resp;
          this.dataSourcesupp.data = this.ELEMENT_DATASUPP;
          this.table.renderRows();
        });

    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcesupp.filter = filterValue.trim().toLowerCase();
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.suppService.cargarAllSuppV(id).subscribe(resp => {
      this.envioDato.emit(resp);
      $('#bsupplies').modal('hide');
    });
  }
}
