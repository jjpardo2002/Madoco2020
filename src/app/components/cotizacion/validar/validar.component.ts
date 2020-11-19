import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { CotizacionRequest } from '../../../models/cotizacion-request';
import { CotizacionService } from '../../services/cotizacion.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CausarechazoService } from '../../services/causarechazo.service';
import { JsonPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { CausaRechazoRequest } from 'src/app/models/causa-rechazo-request';
import { DatePipe } from '@angular/common';
import { QcotizacionService } from '../../services/qcotizacion.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css'],
  providers: [DatePipe]
})
export class ValidarComponent implements OnInit {
  frmRegistro: FormGroup;
  today;
  msg: string;
  displayedColumns: string[] = ['id_cotizacion', 'fecha_coti', 'id_ter_cli', 'validez_oferta', 'observacion', 'select'];
  searchText: string;
  idPk: number;
  idCar: number;
  CAUSAS: CausaRechazoRequest[] = [];
  ELEMENT_DATA: CotizacionRequest[];
  dataSource = new MatTableDataSource<CotizacionRequest>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<CotizacionRequest[]>;
  constructor(private cotiService: CotizacionService,
              private cauRechazoService: CausarechazoService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private qcotizacionService: QcotizacionService) {
    this.envioDato = new EventEmitter();
    this.getCotizaciones();
    this.crearFormulario();
    this.loadCausas();
   }
   crearFormulario(){
    const dateLength = 10;
    // this.today = new Date().toISOString().substring(0, dateLength);
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.frmRegistro = this.fb.group({
      adjudicado  : ['', [ Validators.required, Validators.minLength(3) ]  ],
      id_car_fk  : ['', [ Validators.required, Validators.minLength(1) ]  ],
      fecha  : [this.today, [ Validators.required, Validators.minLength(5) ]  ],
      id_cot_fk  : ['', [ Validators.required, Validators.minLength(5) ]  ],
    });
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 10;
    $('.js-causas').select2();
    /* $('.js-example-basic-single').on('change', function(){
     alert($(this).val());
    });*/

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getCotizaciones()
  {
    this.cotiService.cargarAllCotizaciones().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  loadCausas() {
    this.cauRechazoService.cargarAllCauReJson().then((newCausas) => {
      this.CAUSAS = newCausas.data;
    });
    console.log(this.CAUSAS);
  }
  SearchRowData(id: any){
    this.frmRegistro.get('id_cot_fk').patchValue(id);
    this.idPk = id;
    $('#ECotizacion').modal('show');
    /*this.cotiService.cargarUniqueCotizacion(id).subscribe(resp => {
      $('#ECotizacion').modal('show');
    });*/
  }
  guardar() {

    if ( this.frmRegistro.invalid ) {

      return Object.values( this.frmRegistro.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    // Posteo de información
    this.frmRegistro.reset({
      nombre: 'Sin nombre'
    });

  }
  public saveCode(e): void {
    console.log(e.target.value);
  }
  public saveCodeCausa(e): void {
    const motivo = e.target.value;
    const list = this.CAUSAS.filter(x => x.motivo === motivo)[0];
    this.idCar = list.id_car;
    // console.log(e.target.value);
  }
  public saveCodeCausaRe(e): void {
    console.log(e.target.value);
  }
  onSubmit(){
    this.frmRegistro.get('fecha').patchValue(this.today);
    this.frmRegistro.get('id_car_fk').patchValue(this.idCar);
    console.log(this.frmRegistro.value);
    this.qcotizacionService.InsertRecord(this.frmRegistro.value).subscribe(resp => {
          this.frmRegistro.reset();
          $('#ECotizacion').modal('hide');
    });
  }

}
