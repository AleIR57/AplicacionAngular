import { Router } from '@angular/router';
import { CrudService } from 'src/app/servicio/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  formularioDeProductos:FormGroup;
  Categorias:any;
  imagenPrevisualizacion:any;


  constructor(public formulario:FormBuilder,
    private crudService: CrudService, private ruteador:Router) { 
      this.crudService.ObtenerCategorias().subscribe(respuesta =>{
        console.log(respuesta);
        this.Categorias=respuesta;
      });


    this.formularioDeProductos=this.formulario.group({
      nombre:[''],
      marca:[''],
      modelo:[''],
      descripcion:[''],
      idCategoria:[null],
      fechainicio: new Date(),
      fechafinalizacion: [''],
      precioBase: [null],
      precioActual: [null],
      foto:[''],
      idUsuario: [null]

    })
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
    console.log(this.formularioDeProductos.value['foto']);
    this.imagenPrevisualizacion = this.formularioDeProductos.value['foto'];
  }

  ngOnInit(): void {
  }

  enviarDatos():any{
    this.formularioDeProductos.value['foto'] = this.imagenPrevisualizacion;
    this.formularioDeProductos.value['precioActual'] = this.formularioDeProductos.value['precioBase'];
    console.log("Sujeto");
    console.log(this.formularioDeProductos.value);
    this.crudService.AgregarProducto(this.formularioDeProductos.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-producto');
    });

    
  }

}
