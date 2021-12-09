import { CrudService } from 'src/app/servicio/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {

  Categorias:any;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.ObtenerCategorias().subscribe(respuesta =>{
      console.log(respuesta);
      this.Categorias=respuesta;
    });
  }

  borrarRegistro(idCategoria:any, iControl:any){
    console.log(idCategoria);
    console.log(iControl);
    if(window.confirm("¿Desea borrar el registro?")){
      
    this.crudService.BorrarCategoria(idCategoria).subscribe((respuesta) =>{
      this.Categorias.splice(iControl, 1);
    });
  }
  }

}
