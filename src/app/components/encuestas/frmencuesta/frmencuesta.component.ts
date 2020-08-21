import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EncuestasService } from '../../services/encuestas.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-frmencuesta',
  templateUrl: './frmencuesta.component.html',
  styleUrls: ['./frmencuesta.component.css']
})
export class FrmencuestaComponent implements OnInit {
  frmRegistro: FormGroup;
  msg: string;
  VALIDATION_MESSAGE = {
    titulo_enc : [
      {type : 'required', message : 'El titulo de la encuesta es requerido'},
      {type : 'minlength', message : 'La longitud maxima es de 10 caracteres'}
    ]
  };
  maxChars = 255;
  role = '';
  chars = 0;
  constructor(private fb: FormBuilder, private encuestaService: EncuestasService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }
  get validateNombre()
  {
    return this.frmRegistro.get('titulo_enc').invalid && this.frmRegistro.get('titulo_enc').touched;
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
  }
  guardar()
  {
    if (this.frmRegistro.invalid){
      return Object.values(this.frmRegistro.controls).forEach( control => {
        control.markAsTouched();
        $('#exampleModal').modal('hide');
      });
    }
    $('#exampleModal').modal('hide');
    this.encuestaService.InsertRecord(this.frmRegistro.value).subscribe(resp => {
      if (resp.ErrNumber === 0)
      {
        this.msg = resp.Description;
      }
      else
      {
        this.msg = resp.Description;
      }
      $('#OkMessage').modal('show');
      this.frmRegistro.reset();
    });
  }
  salir()
  {
    this.msg = 'Deseas salir del modulo de registro de encuestas';
    $('#OkMessage').modal('show');
  }
}
