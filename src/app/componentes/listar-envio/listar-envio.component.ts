import { CrudService } from 'src/app/servicio/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-envio',
  templateUrl: './listar-envio.component.html',
  styleUrls: ['./listar-envio.component.css']
})
export class ListarEnvioComponent implements OnInit {

  Envios:any;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.ObtenerEnvios().subscribe(respuesta =>{
      console.log(respuesta);
      this.Envios=respuesta;
    });
    
  }

  borrarRegistro(idEnvio:any, iControl:any){
    console.log(idEnvio);
    console.log(iControl);
    if(window.confirm("¿Desea borrar el registro?")){
      
    this.crudService.BorrarEnvio(idEnvio).subscribe((respuesta) =>{
      this.Envios.splice(iControl, 1);
    });
  }
  }


}
