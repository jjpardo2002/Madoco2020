import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
// Rutas
import { APP_ROUTING } from './app.routes';
// Servicios
import { MenuService } from './components/services/menu.service';
// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HowtoComponent } from './components/howto/howto.component';
import { EncuestaComponent } from './components/encuestas/encuesta/encuesta.component';
import { ComprasComponent } from './components/compras/compras.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { AddProveedorComponent } from './components/action/proveedor/add-proveedor/add-proveedor.component';
import { NgSelect2Module } from 'ng-select2';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Ng2CompleterModule } from 'ng2-completer';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FrmencuestaComponent } from './components/encuestas/frmencuesta/frmencuesta.component';
import { ListaComponent } from './components/encuestas/lista/lista.component';
import { HomeeComponent } from './components/encuestas/homee/homee.component';
import { EditencuestaComponent } from './components/encuestas/editencuesta/editencuesta.component';
import { HomepComponent } from './components/preguntas/homep/homep.component';
import { CrearpComponent } from './components/preguntas/crearp/crearp.component';
import { ListarpComponent } from './components/preguntas/listarp/listarp.component';
import { ModificarpComponent } from './components/preguntas/modificarp/modificarp.component';
import { SearchencuestaComponent } from './components/templates/buscador/searchencuesta/searchencuesta.component';
import { ErrmsgComponent } from './components/templates/dialogos/errmsg/errmsg.component';
import { WarmsgComponent } from './components/templates/dialogos/warmsg/warmsg.component';
import { ConfirmsgComponent } from './components/templates/dialogos/confirmsg/confirmsg.component';
import { ListapreguntaComponent } from './components/templates/buscador/listapregunta/listapregunta.component';
import { SearchpreguntaComponent } from './components/templates/buscador/searchpregunta/searchpregunta.component';
import { MiencuestaComponent } from './components/miencuesta/miencuesta.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { ClientesComponent } from './components/templates/buscador/clientes/clientes.component';
import { PersonalComponent } from './components/templates/buscador/personal/personal.component';
import { BpaisComponent } from './components/templates/buscador/bpais/bpais.component';
import { BregionComponent } from './components/templates/buscador/bregion/bregion.component';
import { BstateComponent } from './components/templates/buscador/bstate/bstate.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    HowtoComponent,
    EncuestaComponent,
    ComprasComponent,
    CardItemComponent,
    ProveedorComponent,
    AddProveedorComponent,
    FrmencuestaComponent,
    ListaComponent,
    HomeeComponent,
    EditencuestaComponent,
    HomepComponent,
    CrearpComponent,
    ListarpComponent,
    ModificarpComponent,
    SearchencuestaComponent,
    ErrmsgComponent,
    WarmsgComponent,
    ConfirmsgComponent,
    ListapreguntaComponent,
    SearchpreguntaComponent,
    MiencuestaComponent,
    ClientesComponent,
    PersonalComponent,
    BpaisComponent,
    BregionComponent,
    BstateComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgSelect2Module,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatIconModule,
    Ng2CompleterModule,
    Ng2SmartTableModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MaterialModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [
    MenuService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
