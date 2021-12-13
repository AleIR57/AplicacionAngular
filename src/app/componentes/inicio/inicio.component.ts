import { CrudService } from 'src/app/servicio/crud.service';

import { Component, OnInit, NgModule } from '@angular/core';



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
    this.crudService.ObtenerProductos().subscribe(respuesta =>{
      console.log(respuesta);
      this.Productos=respuesta;
    });
    this.crudService.ObtenerCategorias().subscribe(respuesta =>{
      console.log(respuesta);
      this.Categorias=respuesta;
    });
  }

}
