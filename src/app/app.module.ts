import { TokenInterceptorService } from './servicio/token-interceptor.service';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarUsuarioComponent } from './componentes/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './componentes/listar-usuario/listar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AgregarCategoriaComponent } from './componentes/agregar-categoria/agregar-categoria.component';
import { ListarCategoriaComponent } from './componentes/listar-categoria/listar-categoria.component';
import { EditarCategoriaComponent } from './componentes/editar-categoria/editar-categoria.component';
import { CrudService } from './servicio/crud.service';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { ListarProductoComponent } from './componentes/listar-producto/listar-producto.component';
import { AgregarOfertaComponent } from './componentes/agregar-oferta/agregar-oferta.component';
import { ListarOfertaComponent } from './componentes/listar-oferta/listar-oferta.component';
import { EditarOfertaComponent } from './componentes/editar-oferta/editar-oferta.component';
import { AgregarEnvioComponent } from './componentes/agregar-envio/agregar-envio.component';
import { ListarEnvioComponent } from './componentes/listar-envio/listar-envio.component';
import { EditarEnvioComponent } from './componentes/editar-envio/editar-envio.component'; 
import { GoogleMapsModule } from '@angular/google-maps';
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DetalleProductoComponent } from './componentes/detalle-producto/detalle-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    ListarUsuarioComponent,
    AgregarCategoriaComponent,
    ListarCategoriaComponent,
    EditarCategoriaComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
    ListarProductoComponent,
    AgregarOfertaComponent,
    ListarOfertaComponent,
    EditarOfertaComponent,
    AgregarEnvioComponent,
    ListarEnvioComponent,
    EditarEnvioComponent,
    LoginComponent,
    RegisterComponent,
    InicioComponent,
    DetalleProductoComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({apiKey: "AIzaSyC9UNNY_GbIQ8V62cUfMjuGZ--nxqkhlbc"}),
    BrowserAnimationsModule,
  ],
  providers: [
    CrudService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas:[
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
