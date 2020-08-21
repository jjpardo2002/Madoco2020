import { Component } from '@angular/core';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html'
})
export class BodyComponent{
    cuerpo='Prueba';
    estado=true;
    ocultar(ctrl:any)
    {
        if(document.getElementById(ctrl).hidden===false)
        {
            document.getElementById(ctrl).hidden = true;
        }else{
            document.getElementById(ctrl).hidden=false;
        }
    }
    opciones: any = [{
        imagen: 'assets/svg/encuesta.svg',
        titulo: 'Gestion de encuestas',
        descripcion: 'Este modulo permitira el registro de encuestas de satisfaccion de los clientes MadocoXXI',
        idname: 'b'
    },
        {
            imagen: 'assets/svg/encuesta.svg',
            titulo: 'Gestion de encuestas',
            descripcion: 'Este modulo permitira el registro de encuestas de satisfaccion de los clientes MadocoXXI',
            idname: 'a'
        }
    ];
}