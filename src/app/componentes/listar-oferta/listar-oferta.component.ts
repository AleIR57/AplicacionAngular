import { CrudService } from 'src/app/servicio/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-oferta',
  templateUrl: './listar-oferta.component.html',
  styleUrls: ['./listar-oferta.component.css']
})
export class ListarOfertaComponent implements OnInit {

  Ofertas:any;
  Productos: any[] = [];  

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.ObtenerOfertasDeUnUsuario(1).subscribe(respuesta =>{
      console.log(respuesta);
      for(let i = 0; i < respuesta.length; i++){
          this.Ofertas=respuesta;
          for(let i = 0; i < respuesta.length; i++){
            this.crudService.ObtenerProductoDeOferta(respuesta[i]['idOferta']).subscribe(respuesta2 =>{
             
              this.Productos.push(respuesta2);
            });
            
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
