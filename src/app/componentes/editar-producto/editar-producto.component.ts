import { CrudService } from 'src/app/servicio/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  elID: any;
  formularioDeProductos:FormGroup;
  Categorias:any;
  Ofertas:any;
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

    

    this.elID=this.activateRoute.snapshot.paramMap.get('id');

    this.crudService.ObtenerOfertasDeProducto(this.elID).subscribe(respuesta =>{
      console.log(respuesta);
      this.Ofertas=respuesta;
    });
    console.log(this.elID);
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

 

}
