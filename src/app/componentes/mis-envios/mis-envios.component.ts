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
  Envios2: any[] = [];
  Usuario!: any;
  EnviosAux: any[] = [];
  idUsuarios: any;  

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token') as string;
    this.Usuario = decode(token);
    console.log(this.Usuario['nombre']);
    let idUsuario = this.Usuario['idUsuario'];

      this.crudService.ObtenerEnvios().subscribe(respuesta =>{
        this.Envios = respuesta;
        for(let i = 0; i < this.Envios.length; i++){
          console.log(this.Envios[i]['idOferta']);
          this.crudService.ObtenerOferta(this.Envios[i]['idOferta']).subscribe(respuesta2 =>{
              console.log(respuesta2[0]['idUsuario']);
              this.idUsuarios = respuesta2[0]['idUsuario'];
              console.log(this.idUsuarios[0]);
              if(this.idUsuarios[0] == idUsuario){
                this.Envios2.push(respuesta2);
                console.log("El tamaño es: ", this.Envios2.length);
                for(let j = 0; j < this.Envios2.length; j++){
                  this.crudService.ObtenerEnvio2(respuesta2[j]['idOferta']).subscribe(respuesta3 =>{
                    this.EnviosAux.push(respuesta3);
                    console.log("Estos son los envios:" , this.EnviosAux);
                    
                  });
                }
              }
              
            
          });
        }
       
      });

      
    
  }

 
}
