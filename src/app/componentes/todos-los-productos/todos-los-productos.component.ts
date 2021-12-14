import { Component, OnInit } from '@angular/core';
import {interval, timer} from 'rxjs';
import { CrudService } from 'src/app/servicio/crud.service';
@Component({
  selector: 'app-todos-los-productos',
  templateUrl: './todos-los-productos.component.html',
  styleUrls: ['./todos-los-productos.component.css']
})
export class TodosLosProductosComponent implements OnInit {

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
