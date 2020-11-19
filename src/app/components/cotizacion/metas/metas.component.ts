import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
declare var $: any;
declare var jQuery: any;

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IndicadorService } from '../../services/indicador.service';
import { IndicadorRequest } from 'src/app/models/indicador-request';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  frmRegistro: FormGroup;
  frmRegistroE: FormGroup;
  mensaje: string;
  msg: string;
  displayedColumns: string[] = ['id_met', 'year_met', 'semestre_met', 'select', 'del'];
  searchText: string;
  idPk: number;
  ELEMENT_DATA: IndicadorRequest[];
  ELEMENT_DATAE: IndicadorRequest[];
  dataSource = new MatTableDataSource<IndicadorRequest>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() envioDato: EventEmitter<IndicadorRequest[]>;
  constructor(private fb: FormBuilder, private imetaService: IndicadorService) {
    this.crearFormulario();
    this.crearFormularioE();
    this.getMetas();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getMetas()
  {
    this.imetaService.cargarAllImetas().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });
  }
  SearchRowData(id: any){
    this.idPk = id;
    this.imetaService.cargarUniqueImetas(id).subscribe(resp => {
      // $('#bpaises').modal('hide');
    });
  }
  crearFormulario(){
    const dateLength = 10;
    // this.today = new Date().toISOString().substring(0, dateLength);
    this.frmRegistro = this.fb.group({
      year_met  : ['', [ Validators.required, Validators.minLength(1) ]  ],
      semestre_met  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      meta_met  : ['', [ Validators.required, Validators.minLength(5) ]  ]
    });
  }

  crearFormularioE(){
    const dateLength = 10;
    // this.today = new Date().toISOString().substring(0, dateLength);
    this.frmRegistroE = this.fb.group({
      id_met  : ['', [ Validators.required, Validators.minLength(1) ]  ],
      year_met  : ['', [ Validators.required, Validators.minLength(1) ]  ],
      semestre_met  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      meta_met  : ['', [ Validators.required, Validators.minLength(5) ]  ]
    });
  }


  get year_metNoValido() {
    return this.frmRegistro.get('year_met').invalid && this.frmRegistro.get('year_met').touched;
  }
  get semestre_metNoValido() {
    return this.frmRegistro.get('semestre_met').invalid && this.frmRegistro.get('semestre_met').touched;
  }
  get meta_metNoValido() {
    return this.frmRegistro.get('meta_met').invalid && this.frmRegistro.get('meta_met').touched;
  }

  get year_metENoValido() {
    return this.frmRegistroE.get('year_met').invalid && this.frmRegistro.get('year_met').touched;
  }
  get semestre_metENoValido() {
    return this.frmRegistroE.get('semestre_met').invalid && this.frmRegistro.get('semestre_met').touched;
  }
  get meta_metENoValido() {
    return this.frmRegistroE.get('meta_met').invalid && this.frmRegistro.get('meta_met').touched;
  }
  Buscareditar(id: number) {
      this.idPk = id;
      this.imetaService.cargarUniqueIndicador(id).subscribe(resp => {
        this.ELEMENT_DATAE = resp;
        this.frmRegistroE.get('id_met').patchValue(this.ELEMENT_DATAE[0].id_met);
        this.frmRegistroE.get('year_met').patchValue(this.ELEMENT_DATAE[0].year_met);
        this.frmRegistroE.get('semestre_met').patchValue(this.ELEMENT_DATAE[0].semestre_met);
        this.frmRegistroE.get('meta_met').patchValue(this.ELEMENT_DATAE[0].meta_met);
        $('#editar').modal('show');
      });
  }
  SeleccionarB(id: number){
    this.idPk = id;
    $('#borrari').modal('show');
  }
  Borrar(){
    this.imetaService.BorrarRecord(this.idPk).subscribe(resp => {
      const rta = resp.FullInfo;
      console.log(rta);
      this.mensaje = 'El registro se guardo correctamente';
      this.getMetas();
      $('#borrari').modal('hide');

    });

  }
  onSubmit() {
    console.log(this.frmRegistro.value);
    if (this.frmRegistro.valid) {
      this.imetaService.InsertRecord(this.frmRegistro.value).subscribe(resp => {
        const rta = resp.ErrNumber;

        this.mensaje = 'El registro se guardo correctamente';
        $('#confirmar').modal('hide');
        $('#msgok').modal('show');
        this.getMetas();
        this.frmRegistro.reset();

      });
    }
    else {
      Object.keys(this.frmRegistro.controls).forEach(field => {
        const control = this.frmRegistro.get(field);

        // tslint:disable-next-line:no-string-literal
        if (!control['controls']) {
          control.markAsTouched({ onlySelf: true });
        }
        // handle if FormArray
        else {
          // tslint:disable-next-line:no-string-literal
          const QFormArray = control['controls'];
          QFormArray.forEach(subcCtrlGp => {
            // tslint:disable-next-line:no-string-literal
            Object.keys(subcCtrlGp['controls']).forEach(subField => {
              const nestedControl = subcCtrlGp.get(subField);
              nestedControl.markAsTouched({ onlySelf: true });
            });
          });
        }
     });
      this.mensaje = 'Hay campos requeridos que se encuentran vacios';
      $('#confirmar').modal('hide');
      $('#msgok').modal('show');
    }

  }
  onSubmitE() {
    if (this.frmRegistroE.valid) {
      this.imetaService.UpdateRecord(this.idPk, this.frmRegistroE.value).subscribe(resp => {
        const rta = resp.ErrNumber;
        this.mensaje = 'El registro se edito correctamente';
        $('#editar').modal('hide');
        $('#msgok').modal('show');
        this.getMetas();
        this.frmRegistroE.reset();

      });
    }
    else {
      Object.keys(this.frmRegistro.controls).forEach(field => {
        const control = this.frmRegistro.get(field);

        // tslint:disable-next-line:no-string-literal
        if (!control['controls']) {
          control.markAsTouched({ onlySelf: true });
        }
        // handle if FormArray
        else {
          // tslint:disable-next-line:no-string-literal
          const QFormArray = control['controls'];
          QFormArray.forEach(subcCtrlGp => {
            // tslint:disable-next-line:no-string-literal
            Object.keys(subcCtrlGp['controls']).forEach(subField => {
              const nestedControl = subcCtrlGp.get(subField);
              nestedControl.markAsTouched({ onlySelf: true });
            });
          });
        }
     });
      this.mensaje = 'Hay campos requeridos que se encuentran vacios';
      $('#confirmar').modal('hide');
      $('#msgok').modal('show');
    }

  }
}
