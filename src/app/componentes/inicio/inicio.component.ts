import { CrudService } from 'src/app/servicio/crud.service';

import { Component, OnInit, NgModule } from '@angular/core';
import {interval, timer} from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']


})
export class InicioComponent implements OnInit {
  Productos:any;
  Categorias:any;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    const contador = interval(1000);
    contador.subscribe(() =>{
      this.crudService.ObtenerProductos().subscribe(respuesta =>{
        this.Productos=respuesta;
      });
    });
    
    this.crudService.ObtenerCategorias().subscribe(respuesta =>{
      console.log(respuesta);
      this.Categorias=respuesta;
    });
  }

}
