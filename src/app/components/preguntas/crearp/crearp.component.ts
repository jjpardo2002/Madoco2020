import { Component, OnInit } from '@angular/core';
import { EncuestaModel } from 'src/app/models/encuesta.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { PreguntaModel } from 'src/app/models/pregunta.model';
import { QuestionsService } from '../../services/questions.service';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-crearp',
  templateUrl: './crearp.component.html',
  styleUrls: ['./crearp.component.css']
})
export class CrearpComponent implements OnInit {
  frmRegistro: FormGroup;
  PreguntaFormGroup: FormGroup;
  /*VALIDATION_MESSAGE = {
    pregunta : [
      {type : 'required', message : 'El enunciado de la pregunta es requerido'}
    ],
    id_enc_fk : [
      {type : 'required', message : 'El codigo de la encuesta es requerido'}
    ]
  };*/
  msg: string;
  idEncuesta: number;
  tituloEncuesta: string;
  constructor(private fb: FormBuilder, private QServ: QuestionsService) {
    this.crearFormulario();
  }
  crearFormulario(){
    this.frmRegistro = this.fb.group({
      // pregunta   : ['', [Validators.required]],
      preguntas : this.fb.array([])
    });
  }
  AddPregunta(){
    this.pregunta.push(this.fb.control('', Validators.required));
  }
  BorrarPregunta(i: number)
  {
    this.pregunta.removeAt(i);
  }
  get pregunta(){
    return this.frmRegistro.get('preguntas') as FormArray;
  }
  limpiar()
  {
    this.frmRegistro.reset();
  }
  ngOnInit(): void {
  }
  asignarEncuesta(ELEMENT_ITEM: EncuestaModel[]){
    this.idEncuesta = ELEMENT_ITEM[0].id_enc;
    this.tituloEncuesta = ELEMENT_ITEM[0].titulo_enc;
  }
  public addQ() {
    const QFormArray = this.pregunta;
    const QFormGroup = new FormGroup({
      pregunta: new FormControl(null, [Validators.required]),
      id_enc_fk: new FormControl(this.idEncuesta, [Validators.required])
    });
    QFormArray.insert(QFormArray.length, QFormGroup);
  }
  guardar()
  {
    console.log(this.frmRegistro.value);
  }
  onSubmit() {
    if (this.frmRegistro.valid) {
      this.QServ.InsertRecord(this.frmRegistro.value).subscribe(resp => {
        console.log(resp);
        this.pregunta.clear();
        this.frmRegistro.reset();
        this.msg = 'El registro se creo correctamente';
        $('#CMessage').modal('show');
      });
    }
    else {
      Object.keys(this.frmRegistro.controls).forEach(field => {
        const control = this.frmRegistro.get(field);

        // handle if basic FormControl
        // tslint:disable-next-line:no-string-literal
        if (!control['controls']) {
          // I prefer to show my validation for untouched fields only on save,
          // I think it's clearer to the user
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
          // can extract this to a recursive function for deeply nested forms
        }
     });
    }

  }

}
