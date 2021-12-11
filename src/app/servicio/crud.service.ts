import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, Categoria, Producto, Oferta, Envio, Rol } from './Usuario';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  API: string='http://localhost/apisubastas/Usuario/index.php'
  API2: string= 'http://localhost/apisubastas/Categoria/index.php'
  API3: string= 'http://localhost/apisubastas/Producto/index.php'
  API4: string= 'http://localhost/apisubastas/Oferta/index.php'
  API7: string= 'http://localhost/apisubastas/Oferta/index2.php'
  API5: string= 'http://localhost/apisubastas/Envio/index.php'
  API6: string= 'http://localhost/apisubastas/Rol/index.php'
  

  constructor(private clienteHttp:HttpClient) { }

  AgregarUsuario(datosUsuario:Usuario):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosUsuario);
  }


  ObtenerUsuarios(){
    return this.clienteHttp.get(this.API);
  }

  BorrarUsuario(idUsuario:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?borrar="+idUsuario);
  }

  ObtenerUsuario(idUsuario:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+idUsuario);
  }

  EditarUsuario(idUsuario:any,datosUsuario:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+idUsuario,datosUsuario);
  }


  AgregarCategoria(datosCategoria:Categoria):Observable<any>{
    return this.clienteHttp.post(this.API2+"?insertar=1",datosCategoria);
  }

  ObtenerCategorias(){
    return this.clienteHttp.get(this.API2);
  }

  BorrarCategoria(idCategoria:any):Observable<any>{
    return this.clienteHttp.get(this.API2+"?borrar="+idCategoria);
  }

  ObtenerCategoria(idCategoria:any):Observable<any>{
    return this.clienteHttp.get(this.API2+"?consultar="+idCategoria);
  }

  EditarCategoria(idCategoria:any,datosCategoria:any):Observable<any>{
    return this.clienteHttp.post(this.API2+"?actualizar="+idCategoria,datosCategoria);
  }

  AgregarProducto(datosProducto:Producto):Observable<any>{
    return this.clienteHttp.post(this.API3+"?insertar=1",datosProducto);
  }
  
  ObtenerProductos(){
    return this.clienteHttp.get(this.API3);
  }

  BorrarProducto(idProducto:any):Observable<any>{
    return this.clienteHttp.get(this.API3+"?borrar="+idProducto);
  }

  ObtenerProducto(idProducto:any):Observable<any>{
    return this.clienteHttp.get(this.API3+"?consultar="+idProducto);
  }

  EditarProducto(idProducto:any,datosProducto:any):Observable<any>{
    return this.clienteHttp.post(this.API3+"?actualizar="+idProducto,datosProducto);
  }

  AgregarOferta(datosOferta:Oferta):Observable<any>{
    return this.clienteHttp.post(this.API4+"?insertar=1",datosOferta);
  }
  
  ObtenerOfertas(){
    return this.clienteHttp.get(this.API4);
  }

  ObtenerOfertasDeProducto(idProducto:any):Observable<any>{
    return this.clienteHttp.get(this.API7+"?consultar2="+idProducto);
  }

  BorrarOferta(idOferta:any):Observable<any>{
    return this.clienteHttp.get(this.API4+"?borrar="+idOferta);
  }

  ObtenerOferta(idOferta:any):Observable<any>{
    return this.clienteHttp.get(this.API4+"?consultar="+idOferta);
  }

  EditarOferta(idOferta:any,datosOferta:any):Observable<any>{
    return this.clienteHttp.post(this.API4+"?actualizar="+idOferta,datosOferta);
  }

  
  AgregarEnvio(datosEnvio:Envio):Observable<any>{
    return this.clienteHttp.post(this.API5+"?insertar=1",datosEnvio);
  }
  
  ObtenerEnvios(){
    return this.clienteHttp.get(this.API5);
  }

  BorrarEnvio(idEnvio:any):Observable<any>{
    return this.clienteHttp.get(this.API5+"?borrar="+idEnvio);
  }

  ObtenerEnvio(idEnvio:any):Observable<any>{
    return this.clienteHttp.get(this.API5+"?consultar="+idEnvio);
  }

  EditarEnvio(idEnvio:any,datosEnvio:any):Observable<any>{
    return this.clienteHttp.post(this.API5+"?actualizar="+idEnvio,datosEnvio);
  }

  AgregarRol(datosRol:Rol):Observable<any>{
    return this.clienteHttp.post(this.API6+"?insertar=1",datosRol);
  }
  
  ObtenerRoles(){
    return this.clienteHttp.get(this.API6);
  }

  BorrarRol(idRol:any):Observable<any>{
    return this.clienteHttp.get(this.API6+"?borrar="+idRol);
  }

  ObtenerRol(idRol:any):Observable<any>{
    return this.clienteHttp.get(this.API6+"?consultar="+idRol);
  }

  EditarRol(idRol:any,datosRol:any):Observable<any>{
    return this.clienteHttp.post(this.API6+"?actualizar="+idRol,datosRol);
  }



  

}
