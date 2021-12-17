import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from './../../servicio/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {interval, timer} from 'rxjs';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-oferta-producto',
  templateUrl: './oferta-producto.component.html',
  styleUrls: ['./oferta-producto.component.css']
})
export class OfertaProductoComponent implements OnInit {

  elID:any;
  formularioDeOfertas!: FormGroup;
  formularioDeProductos!: any;
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
  idCategoria: any;
  UsuarioMaximaOferta =  false;

  constructor(private activateRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador: Router) {
      
      const token = localStorage.getItem('token') as string;
      this.Usuario2 = decode(token);
      console.log(this.Usuario2['nombre']);
  
      


      this.elID=this.activateRoute.snapshot.paramMap.get('id');
     
      this.formularioDeOfertas=this.formulario.group({
        idUsuario:[this.Usuario2['idUsuario']],
        idProducto:[this.elID],
        idEstado:[2],
        precio:[null],
        fecha: new Date,
      });

  
    

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
        this.idCategoria = respuesta[0]['idCategoria'];

      
        
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
      
     const contador2 = interval(1000);
     contador2.subscribe(() =>{
      this.crudService.ObtenerOfertasDeProducto(this.elID).subscribe(respuesta =>{
        console.log(respuesta);
        this.Ofertas=respuesta;
        
        if(this.Ofertas[0]['idUsuario'] == this.Usuario2['idUsuario']){
          this.UsuarioMaximaOferta = true;
        }
        this.cantidadOfertas = respuesta.length;
        for(let i = 0; i < respuesta.length; i++){
          this.crudService.ObtenerOfertasDeUsuarios(respuesta[i]['idOferta']).subscribe(respuesta2 =>{
            this.Usuarios.splice(respuesta.length, respuesta.length);
            this.Usuarios.push(respuesta2);
          });
          
        }
        console.log("Estos son los usuarios: ", this.Usuarios);
       
      });
     });
 
    
    
     }

  ngOnInit(): void {
    
  }

  agregarOferta():any{
    console.log("Sujeto");
    console.log(this.formularioDeOfertas.value);
    console.log(this.Usuario2['idUsuario']);
    this.formularioDeOfertas.value['idUsuario'] = this.Usuario2['idUsuario'];
    
   
    if(this.formularioDeOfertas.value['precio'] > this.Ofertas[0]['precio'] || this.Ofertas[0]['precio'] == undefined){

    
    this.crudService.AgregarOferta(this.formularioDeOfertas.value).subscribe(respuesta =>{
      
      this.crudService.ObtenerOfertasDeProducto(this.elID).subscribe(respuesta2 =>{
        console.log("esto es ", respuesta2);
        this.Ofertas=respuesta2;
        this.cantidadOfertas = respuesta2.length;
      });
      this.Ofertas.push(this.cantidadOfertas, 1);
     
    });
  }
  
  else{
    console.log("Debes ofertar más que el precio actual");
  }

 
  if(this.formularioDeOfertas.value['precio'] > this.Ofertas[0]['precio']){
    this.crudService.ObtenerOfertasDeProducto(this.elID).subscribe(respuesta =>{
      console.log(respuesta);
      this.Ofertas=respuesta;
      this.cantidadOfertas = respuesta.length;
      for(let i = 0; i < respuesta.length-respuesta.length; i++){
        this.crudService.ObtenerOfertasDeUsuarios(respuesta[i]['idOferta']).subscribe(respuesta2 =>{
          this.Usuarios.splice(respuesta.length, respuesta.length);
          this.Usuarios.push(respuesta2);
          
        });
        
      }
      console.log("Estos son los usuarios: ", this.Usuarios);

    });

    this.formularioDeProductos = this.formulario.group({
      nombre:[this.nombre],
      marca:[this.marca],
      modelo:[this.modelo],
      descripcion:[this.descripcion],
      idCategoria:[this.idCategoria],
      fechainicio: [this.fechainicio],
      fechafinalizacion: [this.fechafinalizacion],
      precioBase: [this.precioBase],
      precioActual: [this.precioActual],
      foto:[this.imagenPrevisualizacion],
      idUsuario: [null]
    });
    this.formularioDeProductos.value['precioActual'] = this.formularioDeOfertas.value['precio'];
    this.crudService.EditarPrecioProducto(this.elID, this.formularioDeProductos.value).subscribe(respuesta3 =>{
      this.crudService.ObtenerProducto(this.elID).subscribe(respuesta4 =>{
        this.fechainicio = respuesta4[0]['fechainicio'];
        this.descripcion = respuesta4[0]['descripcion'];
        this.imagenPrevisualizacion = respuesta4[0]['foto'];
        this.marca = respuesta4[0]['marca'];
        this.modelo = respuesta4[0]['modelo'];
        this.precioBase = respuesta4[0]['precioBase'];
        this.precioActual = respuesta4[0]['precioActual'];
        this.idUsuario = respuesta4[0]['idUsuario'];
        this.nombre = respuesta4[0]['nombre'];
        this.fechafinalizacion = respuesta4[0]['fechafinalizacion'];
        this.contador = new Date(this.fechafinalizacion);

      });
      console.log(respuesta3);
      this.ruteador.navigateByUrl('/oferta-producto/'+this.elID);
    });
    
  }

  }
  

}
