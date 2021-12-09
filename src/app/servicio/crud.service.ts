import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, Categoria } from './Usuario';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  API: string='http://localhost/apisubastas/Usuario/index.php'
  API2: string= 'http://localhost/apisubastas/Categoria/index.php'

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

  uploadFile(archivo:any){
    return this.clienteHttp.post('${this.URL2}subisrArchivo.php', JSON.stringify(archivo));
  }

}
