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
    this.crudService.ObtenerOfertas().subscribe(respuesta =>{
      console.log(respuesta);
      this.Ofertas=respuesta;
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
