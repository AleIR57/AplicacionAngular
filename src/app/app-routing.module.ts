import { AgregarOfertaComponent } from './componentes/agregar-oferta/agregar-oferta.component';
import { AgregarCategoriaComponent } from './componentes/agregar-categoria/agregar-categoria.component';
import { ListarUsuarioComponent } from './componentes/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { AgregarUsuarioComponent } from './componentes/agregar-usuario/agregar-usuario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarCategoriaComponent } from './componentes/editar-categoria/editar-categoria.component';
import { ListarCategoriaComponent } from './componentes/listar-categoria/listar-categoria.component';
import { AgregarProductoComponent } from './componentes/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { ListarProductoComponent } from './componentes/listar-producto/listar-producto.component';
import { ListarOfertaComponent } from './componentes/listar-oferta/listar-oferta.component';
import { EditarOfertaComponent } from './componentes/editar-oferta/editar-oferta.component';
import { AgregarEnvioComponent } from './componentes/agregar-envio/agregar-envio.component';
import { ListarEnvioComponent } from './componentes/listar-envio/listar-envio.component';
import { EditarEnvioComponent } from './componentes/editar-envio/editar-envio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'agregar-usuario'},
  {path: 'agregar-usuario', component:AgregarUsuarioComponent},
  {path: 'listar-usuario', component: ListarUsuarioComponent},
  {path: 'editar-usuario/:id', component: EditarUsuarioComponent},
  {path: 'agregar-categoria', component: AgregarCategoriaComponent},
  {path: 'listar-categoria', component: ListarCategoriaComponent},
  {path: 'editar-categoria/:id', component: EditarCategoriaComponent},
  {path: 'agregar-producto', component: AgregarProductoComponent},
  {path: 'listar-producto', component: ListarProductoComponent},
  {path: 'editar-producto/:id', component: EditarProductoComponent},
  {path: 'agregar-oferta', component: AgregarOfertaComponent},
  {path: 'listar-oferta', component: ListarOfertaComponent},
  {path: 'editar-oferta/:id', component: EditarOfertaComponent},
  {path: 'agregar-envio', component: AgregarEnvioComponent},
  {path: 'agregar-envio/:id', component: AgregarEnvioComponent},
  {path: 'listar-envio', component: ListarEnvioComponent},
  {path: 'editar-envio/:id', component: EditarEnvioComponent},
  {path: 'ingresar', component: LoginComponent},
  {path: 'registrar', component: RegisterComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
