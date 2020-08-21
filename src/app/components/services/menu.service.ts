import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private opciones: OpcionMenus[] = [{
      id:  1,
      imagen: 'assets/svg/encuesta.svg',
      titulo: 'Gestion de encuestas',
      pagina: 'encuesta',
      descripcion: 'Este modulo permitira el registro de encuestas de satisfaccion.',
      idname: 'b',
      submenu: []
    },
    {
          id:  2,
          imagen: 'assets/svg/encuesta.svg',
          titulo: 'Modulo de Quejas y Reclamos',
          pagina: 'encuesta',
          descripcion: 'En este modulo se podran registrar las diferentes Incidencias.',
          idname: 'pqr',
          submenu: []
    },
    {
          id:  3,
          imagen: 'assets/svg/encuesta.svg',
          titulo: 'Modulo de Parametros',
          pagina: 'encuesta',
          descripcion: 'En este modulo se podran gestionar los parametros del sistema SGCTI MadocoXXI.',
          idname: 'param',
          submenu: []
    },
    {
          id:  4,
          imagen: 'assets/svg/compra.svg',
          titulo: 'Modulo de Compras',
          pagina: 'compras',
          descripcion: 'En este modulo se podran gestionar los parametros del sistema',
          idname: 'buyf',
          submenu: [
                    {
                      imagen: 'assets/svg/buyf.svg',
                      titulo: 'Proveedores',
                      pagina: 'proveedor',
                      descripcion: 'Gestion de proveedores Madoco',
                      idname: 'idprov',
                    }
                  ]
    }
  ];
  // Cards Compras
  private compras: OpcionSubmenu[] = [
    {
    imagen: 'assets/svg/iproveedor.svg',
    titulo: 'Gestion de proveedores',
    pagina: 'proveedor',
    descripcion: 'Este modulo permite crear nuevos proveedores de MadocoXXI.',
    idname: 'prov',
    },
    {
      imagen: 'assets/svg/ocompra.svg',
      titulo: 'Orden de compra',
      pagina: 'ocompra',
      descripcion: 'Este modulo permite realizar nuevas ordenes de compra.',
      idname: 'ocomp',
    },
    {
      imagen: 'assets/svg/devcompra.svg',
      titulo: 'Devolución Orden de compra',
      pagina: 'devcompra',
      descripcion: 'Este modulo permite realizar devolución ordenes de compra.',
      idname: 'devcomp',
    }
  ];
    // Cards Compras
    private encuesta: OpcionSubmenu[] = [
      {
      imagen: 'assets/svg/encuestam.svg',
      titulo: 'Administracion de encuestas',
      pagina: 'miencuesta',
      descripcion: 'Este modulo permite gestionar nuevas encuestas',
      idname: 'encu',
      },
      {
        imagen: 'assets/svg/Reponder.svg',
        titulo: 'Preguntas',
        pagina: 'preguntas',
        descripcion: 'Este modulo permite crear nuevas encuestas.',
        idname: 'lstp',
        }
    ];
  idAux: number;
  constructor() { }
  getOpcionesEncuesta(): OpcionSubmenu[]{
    return this.encuesta;
  }
  getOpciones(): OpcionMenus[]{
    return this.opciones;
  }
  getCompras(): OpcionSubmenu[]{
    return this.compras;
  }
  buscarSubmenu(termino: string)
  {
    const menuArr: OpcionMenus[] = [];
    for ( const menu of this.opciones)
    {

      const nombre = menu.titulo.toLowerCase();
      if (nombre.indexOf(termino) >= 0)
      {
        menuArr.push(menu);
      }
    }
    return menuArr;
  }
}

export interface OpcionMenus{
          id: number;
          imagen: string;
          titulo: string;
          pagina: string;
          descripcion: string;
          idname: string;
          submenu: OpcionSubmenu[];
}
export interface OpcionSubmenu{
          imagen: string;
          titulo: string;
          pagina: string;
          descripcion: string;
          idname: string;
}
