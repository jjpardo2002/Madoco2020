import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, OnChanges, Renderer2, ElementRef} from '@angular/core';
import { PaisesService } from '../../../services/paises.service';
import { Countries } from '../../../interfaces/countries';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CiudadesService } from '../../../services/ciudades.service';
import { States } from '../../../../models/states';
import { Select2OptionData } from 'ng-select2';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CountriesRequest } from '../../../../models/countries-request';
import { Regions } from '../../../../models/regions';
import { BregionComponent } from '../../../templates/buscador/bregion/bregion.component';
import { RegionsService } from 'src/app/components/services/regions.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PersonsService } from '../../../services/persons.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.css']
})
export class AddProveedorComponent implements OnInit,
            OnDestroy,
            AfterViewInit,
            OnChanges {

  isLinear = false;
  proveedorFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // public idReg: string;
  nombrePais = 'Sin Seleccion';
  idPais = '0';
  nombreRegion = 'Sin Seleccion';
  idRegion = '0';
  nombreCiudad = 'Sin Seleccion';
  idCiudad = '0';
  nombreRol = 'Sin Seleccion';
  idRol = '0';
  nombreTPer = 'Sin Seleccion';
  idTPer = '0';
  dataTable: any;
  // dtOptions: any;
  tableData: Countries[];
  lstPais: Countries[];
  lstCiudad: Observable<any>;
  searchText: string;
  // -----------------
  dtOptions: any = {};
  REGION_DATA: Regions[];
 // ExampleData: Array<Countries>;
  private botones: any[];
  @ViewChild('ciudad') ciudad: ElementRef;
  @ViewChild('dataTable', {static: true}) table;
  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtTrigger: Subject<DataTableDirective> = new Subject();
  p = 1;
  public idc: string;
  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Nombre'
      }
    }
  };
  @ViewChild('nombre') nompais: ElementRef;
  // data: any = [];
  public exampleData: Array<Select2OptionData>;
  ceros: string;
  constructor(private formBuilder: FormBuilder, private paisService: PaisesService,
              private ciudadService: CiudadesService,
              private router: Router,
              private http: HttpClient,
              private renderer: Renderer2,
              private regionService: RegionsService,
              private personService: PersonsService) {

    }
  ngOnInit(): void {
    jQuery('.js-paises-select2').select2(); // initialize select2 to particular input
    jQuery('.js-ciudades-select2').select2(); // initialize select2 to particular input
    const enrutamiento = this.router;
    this.loadCiudades();
    this.proveedorFormGroup = this.formBuilder.group({
      id: ['', Validators.required],
      dv: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      direccion: ['', Validators.required],
      id_ciudad: ['', Validators.required],
      id_rol: ['', Validators.required],
      id_regimen: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  ngOnChanges(){
    console.log('ffff');
  }

  ngOnDestroy(): void {
    // Hay que dessuscribirse del evento dtTrigger, para poder recrear la tabla.
    this.dtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    /* this.dtTrigger.next();
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute('view-person-id')) {
        this.router.navigate(['/person/' + event.target.getAttribute('view-person-id')]);
      }
    }); */
  }
  buscarCiudad()
  {
    // id = $('#pais').select2().find(':selected').data('id');
    console.log('DDDD' );
  }
  loadCiudades(){

    this.lstCiudad = this.ciudadService.getAlls();
  }
  loadPaises(){

    this.paisService.getPaises().subscribe(data => {
      this.tableData = data;
      console.log(this.tableData);
    });
  }
  seleccion(info: any): void
  {
    let infoCiudad = [];
    infoCiudad = info.split('-');
    this.idc = infoCiudad[0];
    this.ciudad.nativeElement.value = infoCiudad[1];
    console.log(info);
    $('#exampleModal').modal('hide');
  }
  someClickHandler(info: any): void {
    console.log(info.id + ' - ' + info.nombre);

  }
  calcularDigitoVerificacion( myNit: string )  {
    const vpri: number[] = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
    let y: any;
    let x: any;
    let z: any;
    // Se valida el nit
    if  ( isNaN ( parseFloat(myNit) ) )  {
      console.log ('El nit/cédula ' + myNit + ' no es válido(a).') ;
      return '' ;
    }
    // Procedimiento
    z = myNit.length ;

    x = 0 ;
    y = 0 ;
    for  (let i = 0; i < z; i++ )  {
      y = ( myNit.substr (i, 1 ) ) ;
      console.log ( y + 'x' + vpri[z - i] + ':' + y ) ;

      x += ( y * vpri [z - i] ) ;
      console.log ( x ) ;
    }

    y = x % 11 ;
    console.log ( y ) ;

    return ( y > 1 ) ? 11 - y : y ;
  }
  isCheckOK(nit: string) {
    const nume = parseFloat(nit);
    let ceros: string;
    let LI_SUMA = 0;
    if ( nume >= 1 )
    {
      this.ceros = '00000000000000';

    }
    if (nume >= 10)
    {
      this.ceros = '0000000000000';
    }
    if (nume >= 100)
    {
      this.ceros = '000000000000';
    }
    if (nume >= 1000)
    {
      this.ceros = '00000000000';
    }
    if (nume >= 10000)
    {
      this.ceros = '0000000000';
    }
    if (nume >= 100000)
    {
      this.ceros = '000000000';
    }
    if (nume >= 1000000)
    {
      this.ceros = '00000000';
    }
    if (nume >= 10000000)
    {
      this.ceros = '0000000';
    }
    if (nume >= 100000000)
    {
      this.ceros = '000000';
    }
    if (nume >= 1000000000)
    {
      this.ceros = '00000';
    }
    if (nume >= 10000000000)
    {
      this.ceros = '0000';
    }
    if (nume >= 100000000000)
    {
      this.ceros = '000';
    }
    if (nume >= 1000000000000)
    {
      this.ceros = '00';
    }
    if (nume >= 10000000000000)
    {
      this.ceros = '0';
    }
    if (nume >= 100000000000000)
    {
      this.ceros = '';
    }
    const LI_PESO: number[] = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
    const LS_STR_NIT: string = this.ceros + nit;
    for (let i = 0; i < 15; i++){
            LI_SUMA += parseFloat( LS_STR_NIT.substring(i , i + 1) ) * LI_PESO[i];
      }
    // tslint:disable-next-line:variable-name
    let digito_chequeo = LI_SUMA % 11;
    if (digito_chequeo >= 2) {
        digito_chequeo = 11 - digito_chequeo;
    }
    return digito_chequeo;
    }
  // Calcular
  calcular(id: string) {
    this.proveedorFormGroup.get('dv').patchValue(this.isCheckOK(id));
  }
  asignarPais(ELEMENT_ITEM: CountriesRequest[]){
    this.nombrePais = ELEMENT_ITEM[0].nombre;
    this.idPais = ELEMENT_ITEM[0].id;
    this.getRegiones();
    // this.nompais.nativeElement.value = ELEMENT_ITEM[0].nombre;
    // this.proveedorFormGroup.get('id_ter_fk').patchValue(ELEMENT_ITEM[0].id);
  }
  asignarRegion(ELEMENT_ITEM: Regions[]){
    this.nombreRegion = ELEMENT_ITEM[0].nombre;
    this.idRegion = ELEMENT_ITEM[0].id;
    // this.nompais.nativeElement.value = ELEMENT_ITEM[0].nombre;
    // this.proveedorFormGroup.get('id_ter_fk').patchValue(ELEMENT_ITEM[0].id);
  }
  asignarCiudad(ELEMENT_ITEM: States[]){
    this.nombreCiudad = ELEMENT_ITEM[0].nombre;
    this.idCiudad = ELEMENT_ITEM[0].id;
    this.proveedorFormGroup.get('id_ciudad').patchValue(ELEMENT_ITEM[0].id);
    // this.nompais.nativeElement.value = ELEMENT_ITEM[0].nombre;
    // this.proveedorFormGroup.get('id_ciudad').patchValue(ELEMENT_ITEM[0].id);
  }
  asignarRol(ELEMENT_ITEM: States[]){
    this.nombreRol = ELEMENT_ITEM[0].nombre;
    this.idRol = ELEMENT_ITEM[0].id;
    this.proveedorFormGroup.get('id_rol').patchValue(ELEMENT_ITEM[0].id);
    // this.nompais.nativeElement.value = ELEMENT_ITEM[0].nombre;
    // this.proveedorFormGroup.get('id_ciudad').patchValue(ELEMENT_ITEM[0].id);
  }
  asignarTipoPer(ELEMENT_ITEM: States[]){
    this.nombreTPer = ELEMENT_ITEM[0].nombre;
    this.idTPer = ELEMENT_ITEM[0].id;
    this.proveedorFormGroup.get('id_regimen').patchValue(ELEMENT_ITEM[0].id);
  }
  getRegiones()
  {
    this.regionService.cargarUniqueRegionV(this.idPais).subscribe(
      resp => {
        this.REGION_DATA = resp;
      });
    // this.lstEncuestas = this.listaService.QueryRecord();
  }
  enviarDatos()
  {
    console.log(this.proveedorFormGroup.value);
    $('#confirmar').modal('hide');
    /*if (this.proveedorFormGroup.invalid){
      return Object.values(this.proveedorFormGroup.controls).forEach( control => {
        control.markAsTouched();
      });
    }
    this.personService.InsertRecord(this.proveedorFormGroup.value).subscribe(resp => {
      if (resp.ErrNumber === 0)
      {
        // this.msg = resp.Description;
      }
      else
      {
        // this.msg = resp.Description;
      }
     $('#OkMessage').modal('show');
      // this.frmRegistro.reset();
    });*/
  }
}

