import { CrudService } from 'src/app/servicio/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  elID: any;
  formularioDeCategorias:FormGroup;
  imagenPrevisualizacion:any;

  constructor(
    private activateRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador: Router
  ) { 
    this.elID=this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.elID);
    this.crudService.ObtenerCategoria(this.elID).subscribe(respuesta =>{
      console.log(respuesta);
      this.formularioDeCategorias.setValue({
        nombre:respuesta[0]['nombre'],
        descripcion:respuesta[0]['descripcion'],
        imagen:respuesta[0]['imagen'],
       
      });
    });
    

    this.formularioDeCategorias = this.formulario.group({
      nombre:[''],
      descripcion:[''],
      imagen:[''],
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
    this.formularioDeCategorias.value['imagen'] = btoa(binaryString);
 
   
    console.log(this.formularioDeCategorias.value['imagen']);
  }


  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log(this.elID);
    console.log(this.formularioDeCategorias.value);
    this.crudService.EditarCategoria(this.elID, this.formularioDeCategorias.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-categoria');
    });
    
  }

}
