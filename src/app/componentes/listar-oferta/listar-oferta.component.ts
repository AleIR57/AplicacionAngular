import { CrudService } from 'src/app/servicio/crud.service';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';


@Component({
  selector: 'app-listar-oferta',
  templateUrl: './listar-oferta.component.html',
  styleUrls: ['./listar-oferta.component.css']
})
export class ListarOfertaComponent implements OnInit {

  Ofertas:any;
  Productos: any[] = [];  
  Usuario:any;
  contador:number = 0;

  constructor(private crudService: CrudService) { }
  

  ngOnInit(): void {
    const token = localStorage.getItem('token') as string;
    this.Usuario = decode(token);
    console.log(this.Usuario['nombre']);
    this.crudService.ObtenerOfertasDeUnUsuario(this.Usuario['idUsuario']).subscribe(respuesta =>{

      for(let i = 0; i < respuesta.length; i++){
        this.Ofertas=respuesta;
        console.log(" Ofertas: ", respuesta[i]['idProducto']);
        console.log(this.Ofertas.some((oferta:any) => oferta.idProducto === '1')); 
        if(respuesta[i]['idProducto'] != respuesta[i+1]['idProducto']){
         
          for(let i = 0; i < respuesta.length; i++){
            this.crudService.ObtenerProductoDeOferta(respuesta[i]['idOferta']).subscribe(respuesta2 =>{
                  this.Productos.push(respuesta2);
              
            });
            
          }
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
