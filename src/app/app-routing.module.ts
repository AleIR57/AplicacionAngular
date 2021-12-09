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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
