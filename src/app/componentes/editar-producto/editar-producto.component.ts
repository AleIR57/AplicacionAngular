import { Oferta } from './../../servicio/Usuario';
import { CrudService } from 'src/app/servicio/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as countdown from 'countdown';
import  decode  from 'jwt-decode';
import { registerLocaleData } from '@angular/common';


@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  
  elID: any;
  formularioDeOfertas: FormGroup;
  formularioDeProductos:FormGroup;
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
  UsuarioMaximaOferta =  false;
  admin: boolean = false;

  constructor(
    private activateRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador: Router
  ) { 

  

    this.crudService.ObtenerCategorias().subscribe(respuesta =>{
      console.log(respuesta);
      this.Categorias=respuesta;
    });

    const token = localStorage.getItem('token') as string;
    this.Usuario2 = decode(token);
    console.log(this.Usuario2['nombre']);


    
    this.elID=this.activateRoute.snapshot.paramMap.get('id');

    this.formularioDeOfertas=this.formulario.group({
      idUsuario:[this.Usuario2['idUsuario']],
      idProducto:[this.elID],
      idEstado:['Vigente'],
      precio:[null],
      fecha: new Date,
    });

    this.crudService.ObtenerOfertasDeProducto(this.elID).subscribe(respuesta =>{
      console.log(respuesta);
      this.Ofertas=respuesta;
      this.cantidadOfertas = respuesta.length;
      for(let i = 0; i < respuesta.length; i++){
        this.crudService.ObtenerOfertasDeUsuarios(respuesta[i]['idOferta']).subscribe(respuesta2 =>{
         
          this.Usuarios.push(respuesta2);
        });
        
      }
      console.log("Estos son los usuarios: ", this.Usuarios);

    });

  

    this.crudService.ObtenerProductoDeUsuario(this.elID).subscribe(respuesta =>{
      console.log(respuesta);
      this.UsuarioProducto = respuesta;
    });

    
    console.log(this.elID);
    this.crudService.ObtenerProducto(this.elID).subscribe(respuesta =>{
      if(this.Usuario2['idRol'] == 2 || this.Usuario2['idUsuario'] == respuesta[0]['idUsuario']){
        console.log("El usuario es el dueño del producto");
        this.admin = true;
      }
  
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

      console.log(this.fechafinalizacion);
      console.log(respuesta);
      this.formularioDeProductos.setValue({
        nombre:respuesta[0]['nombre'],
        marca:respuesta[0]['marca'],
        modelo:respuesta[0]['modelo'],
        descripcion:respuesta[0]['descripcion'],
        idCategoria:respuesta[0]['idCategoria'],
        fechainicio:respuesta[0]['fechainicio'],
        fechafinalizacion:respuesta[0]['fechafinalizacion'],
        precioBase:respuesta[0]['precioBase'],
        precioActual:respuesta[0]['precioActual'],
        foto:respuesta[0]['foto'],
        idUsuario:respuesta[0]['idUsuario'],
       
      });
    });
    

    this.formularioDeProductos = this.formulario.group({
      nombre:[''],
      marca:[''],
      modelo:[''],
      descripcion:[''],
      idCategoria:[null],
      fechainicio: [''],
      fechafinalizacion: [''],
      precioBase: [null],
      precioActual: [null],
      foto:[''],
      idUsuario: [null]
    });

       

  }
  

  seleccionarArchivo(event:any){
    var files = event.target.files;
    var file = files[0];

    if(files && file){
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }


  }

  _handleReaderLoaded(readerEvent:any){
    var binaryString = readerEvent.target.result;
    this.formularioDeProductos.value['foto'] = btoa(binaryString);
 
    this.imagenPrevisualizacion = this.formularioDeProductos.value['foto'];
    console.log(this.formularioDeProductos.value['foto']);
  }


  ngOnInit(): void {
    
   
  }

  enviarDatos():any{
    this.formularioDeProductos.value['foto'] = this.imagenPrevisualizacion;
    console.log(this.elID);
    console.log(this.formularioDeProductos.value);
    this.crudService.EditarProducto(this.elID, this.formularioDeProductos.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-producto');
    });
    
  }

  agregarOferta():any{
    console.log("Sujeto");
    console.log(this.formularioDeOfertas.value);
    this.crudService.AgregarOferta(this.formularioDeOfertas.value).subscribe(respuesta =>{
      this.crudService.ObtenerOfertasDeProducto(this.elID).subscribe(respuesta2 =>{
        console.log(respuesta2);
        this.Ofertas=respuesta2;
        this.cantidadOfertas = respuesta2.length;
      });
      this.Ofertas.push(this.cantidadOfertas, 1);
      this.ruteador.navigateByUrl('/editar-producto/'+this.elID);
    });
    this.formularioDeProductos.value['precioActual'] = this.formularioDeOfertas.value['precio'];

    this.crudService.EditarPrecioProducto(this.elID, this.formularioDeProductos.value).subscribe(respuesta3 =>{
      console.log(respuesta3);
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
  
        console.log(this.fechafinalizacion);
        console.log(respuesta4);
        this.formularioDeProductos.setValue({
          nombre:respuesta4[0]['nombre'],
          marca:respuesta4[0]['marca'],
          modelo:respuesta4[0]['modelo'],
          descripcion:respuesta4[0]['descripcion'],
          idCategoria:respuesta4[0]['idCategoria'],
          fechainicio:respuesta4[0]['fechainicio'],
          fechafinalizacion:respuesta4[0]['fechafinalizacion'],
          precioBase:respuesta4[0]['precioBase'],
          precioActual:respuesta4[0]['precioActual'],
          foto:respuesta4[0]['foto'],
          idUsuario:respuesta4[0]['idUsuario'],
         
        });
      });
      
  
      this.formularioDeProductos = this.formulario.group({
        nombre:[''],
        marca:[''],
        modelo:[''],
        descripcion:[''],
        idCategoria:[null],
        fechainicio: [''],
        fechafinalizacion: [''],
        precioBase: [null],
        precioActual: [null],
        foto:[''],
        idUsuario: [null]
      });
      this.ruteador.navigateByUrl('/editar-producto/'+this.elID);
    });

    this.crudService.ObtenerOfertasDeProducto(this.elID).subscribe(respuesta =>{
      console.log(respuesta);
      this.Ofertas=respuesta;
      this.cantidadOfertas = respuesta.length;
      for(let i = 0; i < respuesta.length; i++){
        this.crudService.ObtenerOfertasDeUsuarios(respuesta[i]['idOferta']).subscribe(respuesta2 =>{
         
          this.Usuarios.push(respuesta2);
        });
        
      }
      console.log("Estos son los usuarios: ", this.Usuarios);

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
