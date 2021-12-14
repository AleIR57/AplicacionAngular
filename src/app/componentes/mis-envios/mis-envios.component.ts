import { CrudService } from 'src/app/servicio/crud.service';
import { Component, OnInit } from '@angular/core';
import  decode  from 'jwt-decode';
import {interval, timer} from 'rxjs';
@Component({
  selector: 'app-mis-envios',
  templateUrl: './mis-envios.component.html',
  styleUrls: ['./mis-envios.component.css']
})
export class MisEnviosComponent implements OnInit {
  Envios:any;
  Usuario!: any;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') as string;
    this.Usuario = decode(token);
    console.log(this.Usuario['nombre']);
    const contador = interval(1000);
    contador.subscribe(() =>{
      this.crudService.ObtenerEnviosDeUsuario(this.Usuario['idUsuario']).subscribe(respuesta =>{
        this.Envios=respuesta;
      });
    });
    
  }

 
}
