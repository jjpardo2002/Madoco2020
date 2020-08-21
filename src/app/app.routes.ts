import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HowtoComponent } from './components/howto/howto.component';
import { EncuestaComponent } from './components/encuestas/encuesta/encuesta.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { AddProveedorComponent } from './components/action/proveedor/add-proveedor/add-proveedor.component';
import { FrmencuestaComponent } from './components/encuestas/frmencuesta/frmencuesta.component';
import { HomeeComponent } from './components/encuestas/homee/homee.component';
import { ListaComponent } from './components/encuestas/lista/lista.component';
import { EditencuestaComponent } from './components/encuestas/editencuesta/editencuesta.component';
import { HomepComponent } from './components/preguntas/homep/homep.component';
import { CrearpComponent } from './components/preguntas/crearp/crearp.component';
import { ListarpComponent } from './components/preguntas/listarp/listarp.component';
import { ModificarpComponent } from './components/preguntas/modificarp/modificarp.component';
import { MiencuestaComponent } from './components/miencuesta/miencuesta.component';

const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'howto', component: HowtoComponent},
    {path: 'encuesta', component: EncuestaComponent},
    {path: 'compras', component: ComprasComponent},
    {path: 'proveedor',
      component: ProveedorComponent,
      children: [
        {path: 'add', component: AddProveedorComponent}
      ]
    },
    {path: 'encuestas',
      component: HomeeComponent,
      children: [
        {path: 'frmencuesta', component: FrmencuestaComponent},
        {path: 'verencuestas', component: ListaComponent},
        {path: 'editarencuesta', component: EditencuestaComponent}
      ]
    },
    {path: 'preguntas',
    component: HomepComponent,
    children: [
      {path: 'crearpregunta', component: CrearpComponent},
      {path: 'verpregunta', component: ListarpComponent},
      {path: 'editarpregunta', component: ModificarpComponent},
      {path: '**', pathMatch: 'full', redirectTo: 'crearpregunta'}
    ]
  },
  {path: 'miencuesta', component: MiencuestaComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
