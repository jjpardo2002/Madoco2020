import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { MiencuestaService } from '../services/miencuesta.service';
import { MiEncuestas } from '../../models/mi-encuestas';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { PersonsService } from '../services/persons.service';
import { MiCliente } from '../../models/mi-cliente';
import { MiEmpleado } from '../../models/mi-empleado';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-miencuesta',
  templateUrl: './miencuesta.component.html',
  styleUrls: ['./miencuesta.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiencuestaComponent implements OnInit {
  public encu: any = [];
  idCliente: string;
  nombreCli: string;
  public rtasp: any = [];
  frmRegistro: FormGroup;
  dynamicForm: FormGroup;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  @ViewChild('nombreper') nomemp: ElementRef;
  @ViewChild('nombre') nomcliente: ElementRef;
  constructor(private fb: FormBuilder, private miencuestaService: MiencuestaService, private personaService: PersonsService) {
    this.crearFormulario();
  }
  loadClientes()
  {
    this.personaService.cargarClientes()
    .subscribe(resp => {
      console.log(resp);
    });
  }
    // convenience getters for easy access to form fields
  ngOnInit(): void {
    this.miencuestaService.cargarEncuestas()
      .subscribe(resp => {
        this.encu = resp;
        for (const data of this.encu)
        {

              this.rtas.push(this.fb.group({
                id_rta: ['', Validators.required],
                id_pre_fk: [data.rtas[0].id_pre_fk]
              }));


        }
      });
    }
    asignarEncuesta(ELEMENT_ITEM: MiCliente[]){
      this.nomcliente.nativeElement.value = ELEMENT_ITEM[0].name;
      this.frmRegistro.get('id_ter_fk').patchValue(ELEMENT_ITEM[0].id);
    }
    asignarPersona(ELEMENT_ITEM: MiEmpleado[]){
      this.nomemp.nativeElement.value = ELEMENT_ITEM[0].name;
      this.frmRegistro.get('id_res_fk').patchValue(ELEMENT_ITEM[0].id);
    }
  crearFormulario(){
    const dateLength = 10;
    const today = new Date().toISOString().substring(0, dateLength);
    this.frmRegistro = this.fb.group({
      id_ter_fk: ['', Validators.required],
      id_res_fk: ['', Validators.required],
      fecha_enm: new FormControl(today),
      rtase : new FormArray([])
    });
  }
 AddRespuesta(){
    this.rtas.push(this.fb.control('', Validators.required));
  }
  /*
  AddPregunta(){
    this.rta.push(this.fb.control('', Validators.required));
  }*/
  get rtas(){
    return this.frmRegistro.get('rtase') as FormArray;
  }
  /*public addRta() {
    const RFormArray = this.rta;
    const RFormGroup = new FormGroup({
      id_rta: new FormControl(null, [Validators.required]),
      id_pre_fk: new FormControl(null, [Validators.required])
    });
    RFormArray.insert(RFormArray.length, RFormGroup);
  }*/
  onSubmit(){
    if (this.frmRegistro.valid) {
      this.miencuestaService.InsertEncuesta(this.frmRegistro.value).subscribe(resp => {
        console.log(resp);
        this.rtas.clear();
        this.frmRegistro.reset();
       // $('#CMessage').modal('show');
      });
    }
  }
}
