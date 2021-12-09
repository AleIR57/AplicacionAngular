import { Router } from '@angular/router';
import { CrudService } from 'src/app/servicio/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent implements OnInit {

  formularioDeCategorias:FormGroup;


  constructor(public formulario:FormBuilder,
    private crudService: CrudService, private ruteador:Router) { 
    this.formularioDeCategorias=this.formulario.group({
      nombre:[''],
      descripcion:[''],
      imagen:[''],

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
    this.formularioDeCategorias.value['imagen'] = btoa(binaryString);
    console.log(this.formularioDeCategorias.value['imagen']);
  }

  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log("Sujeto");
    console.log(this.formularioDeCategorias.value);
    this.crudService.AgregarCategoria(this.formularioDeCategorias.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-categoria');
    });

    
  }

}
