import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from './../../servicio/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {interval, timer} from 'rxjs';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  elID:any;

  Categorias:any;
  Ofertas:any;
  Usuarios: any[] = [];
  Usuario2: any;
  imagenPrevisualizacion:any;
  fechafinalizacion:any;
  desplegable = false;
  descripcion: any;
  fechainicio: any;
  marca:any;
  modelo: any;
  precioBase: any;
  precioActual: any;
  idUsuario: any;
  nombre: any;
  cantidadOfertas: any;
  contador:any;
  x:any;
  demo:any;
  demoBoolean = true;
  show = 0;
  UsuarioProducto: any;

  constructor(private activateRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador: Router) {
      const contador = interval(1000);
    contador.subscribe(() =>{
      this.elID=this.activateRoute.snapshot.paramMap.get('id');
      this.crudService.ObtenerProducto(this.elID).subscribe(respuesta =>{
        this.fechainicio = respuesta[0]['fechainicio'];
        this.descripcion = respuesta[0]['descripcion'];
        this.imagenPrevisualizacion = respuesta[0]['foto'];
        this.marca = respuesta[0]['marca'];
        this.modelo = respuesta[0]['modelo'];
        this.precioBase = respuesta[0]['precioBase'];
        this.precioActual = respuesta[0]['precioActual'];
        this.idUsuario = respuesta[0]['idUsuario'];
        this.nombre = respuesta[0]['nombre'];
        this.fechafinalizacion = respuesta[0]['fechafinalizacion'];
        this.contador = new Date(this.fechafinalizacion);
        
        this.x = setInterval(()=>{
          var now = new Date().getTime();
          var distance = this.contador - now;
          var days =  Math.floor(distance/(1000*60*60*24));
          var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
          var minutes = Math.floor((distance % (1000*60*60))/ (1000*60));
          var seconds = Math.floor((distance % (1000*60)) / 1000);
          this.demo = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
          if(distance < 0){
            clearInterval(this.x);
            this.demo = "Cerrada";
            this.demoBoolean = false;
          }
        })
  
        
      });

      this.crudService.ObtenerProductoDeUsuario(this.elID).subscribe(respuesta =>{
        console.log(respuesta);
        this.UsuarioProducto = respuesta;
      });
    });
     

    
      
     }

  ngOnInit(): void {
    
  }

}
