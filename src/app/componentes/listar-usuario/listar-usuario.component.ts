import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/servicio/crud.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {


  Usuarios:any;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.ObtenerUsuarios().subscribe(respuesta =>{
      console.log(respuesta);
      this.Usuarios=respuesta;
    });
  }

  borrarRegistro(idUsuario:any, iControl:any){
    console.log(idUsuario);
    console.log(iControl);
    if(window.confirm("¿Desea borrar el registro?")){
      
    this.crudService.BorrarUsuario(idUsuario).subscribe((respuesta) =>{
      this.Usuarios.splice(iControl, 1);
    });
  }
  }

}
