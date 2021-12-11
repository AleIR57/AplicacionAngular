import { CrudService } from 'src/app/servicio/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-oferta',
  templateUrl: './listar-oferta.component.html',
  styleUrls: ['./listar-oferta.component.css']
})
export class ListarOfertaComponent implements OnInit {

  Ofertas:any;
  

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.ObtenerOfertasDeUnUsuario(1).subscribe(respuesta =>{
      console.log(respuesta);
      for(let i = 0; i < respuesta.length; i++){
        console.log("El id del producto es: " + respuesta[i]['idProducto']);
        if(respuesta[i]['idProducto'] != respuesta[i+1]['idProducto']){
          this.Ofertas=respuesta;
        }
        else{
          console.log("Sujeto");
          this.Ofertas.splice(respuesta[i], 1);
        }
      }
      
    });
  }

  borrarRegistro(idOferta:any, iControl:any){
    console.log(idOferta);
    console.log(iControl);
    if(window.confirm("¿Desea borrar el registro?")){
      
    this.crudService.BorrarOferta(idOferta).subscribe((respuesta) =>{
      this.Ofertas.splice(iControl, 1);
    });
  }
  }

}
