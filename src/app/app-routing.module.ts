import { AgregarPagoComponent } from './componentes/agregar-pago/agregar-pago.component';

import { RoleGuard } from './guards/role.guard';
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
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { DetalleProductoComponent } from './componentes/detalle-producto/detalle-producto.component';
import { TodosLosProductosComponent } from './componentes/todos-los-productos/todos-los-productos.component';
import { ProductosDeUsuarioComponent } from './componentes/productos-de-usuario/productos-de-usuario.component';
import { OfertaProductoComponent } from './componentes/oferta-producto/oferta-producto.component';
import { MisEnviosComponent } from './componentes/mis-envios/mis-envios.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
  {path: 'agregar-usuario', component:AgregarUsuarioComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  {path: 'listar-usuario', component: ListarUsuarioComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  {path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  {path: 'agregar-categoria', component: AgregarCategoriaComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  {path: 'listar-categoria', component: ListarCategoriaComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  {path: 'editar-categoria/:id', component: EditarCategoriaComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  {path: 'agregar-producto', component: AgregarProductoComponent},
  {path: 'listar-producto', component: ListarProductoComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  {path: 'editar-producto/:id', component: EditarProductoComponent},
  {path: 'agregar-oferta', component: AgregarOfertaComponent},
  {path: 'listar-oferta', component: ListarOfertaComponent},
  {path: 'editar-oferta/:id', component: EditarOfertaComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  {path: 'agregar-envio', component: AgregarEnvioComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  {path: 'agregar-envio/:id', component: AgregarEnvioComponent},
  {path: 'listar-envio', component: ListarEnvioComponent},
  {path: 'editar-envio/:id', component: EditarEnvioComponent},
  {path: 'ingresar', component: LoginComponent},
  {path: 'registrar', component: RegisterComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'detalle-producto/:id', component:DetalleProductoComponent},
  {path: 'todos-los-productos', component: TodosLosProductosComponent},
  {path: 'productos-de-usuario', component: ProductosDeUsuarioComponent},
  {path: 'oferta-producto/:id', component: OfertaProductoComponent},
  {path: 'mis-envios', component: MisEnviosComponent},
  {path: 'agregar-pago/:id', component: AgregarPagoComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
