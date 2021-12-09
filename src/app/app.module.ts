import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarUsuarioComponent } from './componentes/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './componentes/listar-usuario/listar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AgregarCategoriaComponent } from './componentes/agregar-categoria/agregar-categoria.component';
import { ListarCategoriaComponent } from './componentes/listar-categoria/listar-categoria.component';
import { EditarCategoriaComponent } from './componentes/editar-categoria/editar-categoria.component';
import { CrudService } from './servicio/crud.service';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { ListarProductoComponent } from './componentes/listar-producto/listar-producto.component'; 


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
    ListarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CrudService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
