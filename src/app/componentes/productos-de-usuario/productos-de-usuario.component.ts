import { Component, OnInit } from '@angular/core';
import {interval, timer} from 'rxjs';
import { CrudService } from 'src/app/servicio/crud.service';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-productos-de-usuario',
  templateUrl: './productos-de-usuario.component.html',
  styleUrls: ['./productos-de-usuario.component.css']
})
export class ProductosDeUsuarioComponent implements OnInit {

  Productos:any;
  Usuario!: any;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') as string;
    this.Usuario = decode(token);
    console.log(this.Usuario['nombre']);
    const contador = interval(1000);
    contador.subscribe(() =>{
      this.crudService.ObtenerTodosLosProductosDeUsuario(this.Usuario['idUsuario']).subscribe(respuesta =>{
        this.Productos=respuesta;
      });
    });
  
  }
}
