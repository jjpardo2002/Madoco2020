import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { EncuestasService } from '../../services/encuestas.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { EncuestaModel } from '../../../models/encuesta.model';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-editencuesta',
  templateUrl: './editencuesta.component.html',
  styleUrls: ['./editencuesta.component.css']
})
export class EditencuestaComponent implements OnInit {
  frmRegistro: FormGroup;
  VALIDATION_MESSAGE = {
    titulo_enc : [
      {type : 'required', message : 'El titulo de la encuesta es requerido'},
      {type : 'minlength', message : 'La longitud maxima es de 10 caracteres'}
    ]
  };
  msg: string;
  lstEncuestas: Observable<any>;
  displayedColumns: string[] = ['id_enc', 'titulo_enc', 'detalle_enc', 'accion', 'del'];
  searchText: string;
  p = 1;
  maxChars = 255;
  idError: number;
  idPk: number;
  ELEMENT_DATA: EncuestaModel[];
  ELEMENT_ITEM: EncuestaModel[];
  dataSource = new MatTableDataSource<EncuestaModel>();
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private listaService: EncuestasService,
              private fb: FormBuilder) {
    this.crearFormulario();
    this.getEncuestas();
  }
  get validateNombre()
  {
    return this.frmRegistro.get('titulo_enc').invalid && this.frmRegistro.get('titulo_enc').touched;
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEncuestas()
  {
    this.listaService.QueryRecordE().subscribe(
      resp => {
        this.ELEMENT_DATA = resp;
        console.log(this.ELEMENT_DATA);
        this.dataSource.data = this.ELEMENT_DATA;
        this.table.renderRows();
      });

    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  editar(){
    console.log(this.frmRegistro.value);
    if (this.frmRegistro.invalid){
      return Object.values(this.frmRegistro.controls).forEach( control => {
        control.markAsTouched();
      });
    }
    this.listaService.UpdateRecord(this.idPk, this.frmRegistro.value).subscribe(resp => {
        this.idError = resp.ErrNumber;
        if (resp.ErrNumber === 0)
        {
          this.msg = resp.Description + ' Haga click en cerrar para finalizar';
        }
        else
        {
          this.msg = resp.Description;
        }

        this.getEncuestas();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  SearchRowData(id: any){
    this.idError = null;
    this.idPk = id;
    this.listaService.BuscarRegistro(id).subscribe(resp => {
      this.ELEMENT_ITEM = resp;
      $('#frmeditar').modal('show');
      this.ELEMENT_ITEM.forEach(key => {
        this.frmRegistro.setValue({
          titulo_enc: key.titulo_enc,
          detalle_enc: key.detalle_enc
        });
      });
    });

  }
  dialogo(id: any)
  {
    this.idPk = id;
    this.msg = 'Desea eliminar el registro seleccionado';
    $('#WMessage').modal('show');
  }
  DeleteRowData(){
    this.listaService.DeleteRecord(this.idPk).subscribe(resp => {
      this.getEncuestas();
      $('#WMessage').modal('hide');
      if (resp.ErrNumber === 0)
      {
        this.msg = resp.Description + ' Haga click en cerrar para finalizar';
      }
      else
      {
        this.msg = resp.Description;
      }
      $('#OkMessage').modal('show');
    });
  }
  crearFormulario(){
    this.frmRegistro = this.fb.group({
      titulo_enc   : ['', [Validators.required, Validators.minLength(10)]],
      detalle_enc  : [''],
    });
  }
  limpiar()
  {
    this.frmRegistro.reset();
    $('#frmeditar').modal('hide');
  }
}
