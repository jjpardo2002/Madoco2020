import { DatePipe } from '@angular/common';
import { Component, DebugElement, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OcompraService } from 'src/app/components/services/ocompra.service';
import { TmonedaService } from 'src/app/components/services/tmoneda.service';
import { ProveedorRequest } from 'src/app/models/proveedor-request';
import { SucursalRequest } from 'src/app/models/sucursal-request';
import { SuppliesRequest } from 'src/app/models/supplies-request';
import { UnitMeasurementRequest } from 'src/app/models/unit-measurement-request';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css'],
  providers: [DatePipe]
})
export class OrdenComponent implements OnInit {
  frmRegistro: FormGroup;
  ordeCNro: number = Date.now();
  today: any;
  idx: any;
  subtotal: number;
  totalcompra: number;
  subtotalc: number;
  ivacompra: number;
  iva: number;
  suministro: string[] = []; // Nombre del elemento a comprar
  nombreProv: string;
  nombreSuc: string;
  lstmonedas: [] = [];
  resultsMonedas: Observable<any>;
  @ViewChild('subtotal') childSub: ElementRef;
  @ViewChild('cantidad') childCant: ElementRef;
  @ViewChild('vcompra') childVComp: ElementRef;
  ValidationMessage = {
    id_suministro: [
      {type: 'required', message: 'Id Suministro no puede ser vacio'}
    ],
    cantidad: [
      {type: 'required', message: 'Cantidad no puede ser vacio'}
    ],
    valor_compra: [
      {type: 'required', message: 'Valor de compra no puede ser vacio'},
    ],
    item: [
      {type: 'required', message: 'Item no puede ser vacio'},
    ],
    subtotal: [
      {type: 'required', message: 'Subtotal no puede ser vacio'},
    ]
  };
  constructor(private datePipe: DatePipe,
              private fb: FormBuilder, private tmonedaService: TmonedaService,
              private ocService: OcompraService) {
                this.crearFormulario();
                this.getMonedaType();
              }

  ngOnInit(): void {

  }
  getMonedasType(){
    this.tmonedaService.MonedasList().then(res => {
      console.log('Resultado', res);
    });
  }
  getMonedaType(){
    this.resultsMonedas = this.tmonedaService.ListaMonedas();
    // console.log(this.type);
    this.resultsMonedas.subscribe(res => {
      console.log('Resultado', res);
    });
  }
  get observacionNoValido() {
    return this.frmRegistro.get('observacion').invalid && this.frmRegistro.get('observacion').touched;
  }
  get ord_compNoValido() {
    return this.frmRegistro.get('ord_comp').invalid && this.frmRegistro.get('ord_comp').touched;
  }
  get idproveedorNoValido() {
    return this.frmRegistro.get('id_prov').invalid && this.frmRegistro.get('id_prov').touched;
  }
  get id_sucNoValido() {
    return this.frmRegistro.get('id_suc').invalid && this.frmRegistro.get('id_suc').touched;
  }
  get suministroNoValido() {
    const control = this.frmRegistro.get('detalle_orden') as FormArray;
    return control.get('id_suministro').invalid && control.get('id_suministro').touched;
  }
  crearFormulario(){
    const dateLength = 10;
    // this.today = new Date().toISOString().substring(0, dateLength);
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    this.frmRegistro = this.fb.group({
      ord_comp  : [this.ordeCNro, [ Validators.required, Validators.minLength(3) ]  ],
      id_prov  : ['', [ Validators.required, Validators.minLength(1) ]  ],
      fecha  : [this.today, [ Validators.required, Validators.minLength(5) ]  ],
      fecha_com  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      id_suc  : ['', [ Validators.required, Validators.minLength(5) ]  ],
      subtotal  : ['', [ Validators.required ]  ],
      valoriva  : ['', [ Validators.required ]  ],
      descuento  : ['', [ Validators.required ]  ],
      id_tyc_fk  : ['', [ Validators.required ]  ],
      observacion  : ['EN EL CASO DE INCUMPLIMIENTO EN ESPECIFICACIONES TECNICAS, FECHA DE ENTREGA, ES EL PROVEEDOR QUIEN DEBERA ASUMIR LA SUBSANACION CORRESPONDIENTE Y SE VERA AFECTADA LA EVALUACION DE DESEMPEÑO ', [ Validators.required ]  ],
      detalle_orden: this.fb.array([
        this.getItems()
      ])
    });
  }
  AsignarData(i: number)
  {
    this.idx = i;
    $('#bsupplies').modal('show');
  }
  AsignarDataU(i: number)
  {
    this.idx = i;
    $('#bumedida').modal('show');
  }
  totalizarCompra()
  {
    this.totalcompra = 0;
    Object.keys(this.frmRegistro.controls).forEach(field => {
      const control = this.frmRegistro.get(field);

      // handle if basic FormControl
      // tslint:disable-next-line:no-string-literal
      if (control['controls']) {
        // I prefer to show my validation for untouched fields only on save,
        // tslint:disable-next-line:no-string-literal
        const QFormArray = this.ordenCompra.controls;
        QFormArray.forEach(subcCtrlGp => {
          this.totalcompra += subcCtrlGp.get('valor_compra').value * subcCtrlGp.get('cantidad').value;
          console.log(this.totalcompra);
          // tslint:disable-next-line:no-string-literal
        });
        // can extract this to a recursive function for deeply nested forms
      }
   });
    console.log(this.frmRegistro.get('valoriva').value);
    this.iva = this.frmRegistro.get('valoriva').value;
    this.totalcompra = (this.iva * this.totalcompra) / 100 ;
  }
  CalcularSubtotal()
  {
    this.totalcompra = 0;
    Object.keys(this.frmRegistro.controls).forEach(field => {
      const control = this.frmRegistro.get(field);

      // handle if basic FormControl
      // tslint:disable-next-line:no-string-literal
      if (control['controls']) {
        // I prefer to show my validation for untouched fields only on save,
        // tslint:disable-next-line:no-string-literal
        const QFormArray = this.ordenCompra.controls;
        QFormArray.forEach(subcCtrlGp => {
          subcCtrlGp.get('subtotal').patchValue(subcCtrlGp.get('valor_compra').value * subcCtrlGp.get('cantidad').value);
          this.totalcompra += subcCtrlGp.get('valor_compra').value * subcCtrlGp.get('cantidad').value;
          // tslint:disable-next-line:no-string-literal
        });
        // can extract this to a recursive function for deeply nested forms
      }
   });
    this.iva = this.frmRegistro.get('valoriva').value;
    this.subtotalc = this.totalcompra;
    this.ivacompra = (this.iva * this.totalcompra) / 100 ;
    this.totalcompra += this.ivacompra;
    this.frmRegistro.get('subtotal').patchValue(this.subtotalc);
  }
  BorrarPregunta(i: number)
  {
    this.ordenCompra.removeAt(i);
    this.CalcularSubtotal();
  }
  get ordenCompra(){
    return this.frmRegistro.get('detalle_orden') as FormArray;
  }
  private getItems() {
    const numberPatern = '^[0-9.,]+$';
    return this.fb.group({
      id_suministro: new FormControl(null, Validators.required),
      cantidad: new FormControl(null, Validators.required),
      valor_compra: new FormControl(null, Validators.required),
      subtotal: new FormControl(null, Validators.required),
      item: new FormControl(null, Validators.required),
      umcod: new FormControl(null, Validators.required),
      um: new FormControl(null, [Validators.compose([Validators.required, Validators.minLength(3)]) ])
    });
  }
  public addItem(){
    this.ordenCompra.push(this.getItems());
  }
  public addOC() {
    const QFormArray = this.ordenCompra;
    const QFormGroup = new FormGroup({
      id_suministro: new FormControl(null, [Validators.compose([Validators.required,Validators.minLength(3)])]),
      cantidad: new FormControl(null, [Validators.compose([Validators.required,Validators.minLength(1)])]),
      valor_compra: new FormControl(null, [Validators.compose([Validators.required,Validators.minLength(3)])]),
      subtotal: new FormControl(null, [Validators.required, Validators.compose([Validators.required,Validators.minLength(3)]) ]),
      item: new FormControl(null, [Validators.compose([Validators.required, Validators.minLength(3)]) ]),
       um: new FormControl(null, [Validators.compose([Validators.required, Validators.minLength(3)]) ])
    });
    QFormArray.insert(QFormArray.length, QFormGroup);
    this.suministro.push('Sin asignar');
  }
  asignarUmed(ELEMENT_ITEM: UnitMeasurementRequest[]){
    this.ordenCompra.controls[this.idx].get('umcod').patchValue(ELEMENT_ITEM[0].id);
    this.ordenCompra.controls[this.idx].get('um').patchValue(ELEMENT_ITEM[0].nombre);
  }
  asignarSupp(ELEMENT_ITEM: SuppliesRequest[]){
    this.ordenCompra.controls[this.idx].get('id_suministro').patchValue(ELEMENT_ITEM[0].id);
    this.ordenCompra.controls[this.idx].get('item').patchValue(ELEMENT_ITEM[0].item);
  }
  asignarProv(ELEMENT_ITEM: ProveedorRequest[]){
    this.frmRegistro.get('id_prov').patchValue(ELEMENT_ITEM[0].id);
    this.nombreProv = ELEMENT_ITEM[0].name;
  }
  asignarSuc(ELEMENT_ITEM: SucursalRequest[]){
    this.frmRegistro.get('id_suc').patchValue(ELEMENT_ITEM[0].nit);
    this.nombreSuc = ELEMENT_ITEM[0].nombre;
  }
  CalcularIva(iva: number){

  }
  onSubmit() {
    console.log(this.frmRegistro.value);
    if (this.frmRegistro.valid) {
      if (this.ordenCompra.controls.length > 0)
      {
        this.ocService.InsertOc(this.frmRegistro.value).subscribe(resp => {
          if (resp.ErrNumber === 0)
          {
            console.log(resp.Description);
          }
          else
          {
            console.log(resp.FullInfo);
          }
          // this.frmRegistro.reset();
        });
        $('#confirmar').modal('hide');
      }else{
        $('#confirmar').modal('hide');
        $('#eitems').modal('show');
      }

      /*this.QServ.InsertRecord(this.frmRegistro.value).subscribe(resp => {
        console.log(resp);
        this.ordenCompra.clear();
        this.frmRegistro.reset();
        this.msg = 'El registro se creo correctamente';
        $('#CMessage').modal('show');
      });*/
    }
  }
}
