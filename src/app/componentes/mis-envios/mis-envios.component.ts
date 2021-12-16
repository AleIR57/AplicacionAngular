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
  Envios2: any;
  Usuario!: any;
  EnviosAux: any;  

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') as string;
    this.Usuario = decode(token);
    console.log(this.Usuario['nombre']);
    let idUsuario = this.Usuario['idUsuario'];

      this.crudService.ObtenerEnvios().subscribe(respuesta =>{
        this.Envios = respuesta;
        for(let i = 0; i < this.Envios.length; i++){
          this.crudService.ObtenerOferta(this.Envios[i]['idOferta']).subscribe(respuesta2 =>{
            
              this.EnviosAux = (respuesta2);
              console.log(this.EnviosAux[i]['idUsuario']);
            
          });
        }
       
      });
    
  }

 
}
