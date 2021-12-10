
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  formularioDeUsuarios:FormGroup;
  Roles:any
  imagenPrevisualizacion:any;


  constructor(public formulario:FormBuilder,
    private crudService: CrudService, private ruteador:Router) { 
      this.crudService.ObtenerRoles().subscribe(respuesta =>{
        console.log(respuesta);
        this.Roles=respuesta;
      });

      
    this.formularioDeUsuarios=this.formulario.group({
      nombre:[''],
      apellido:[''],
      correo:[''],
      contrasena:[''],
      telefono:[null],
      direccion:[null],
      cedula:[''],
      foto:[''],
      fecharegistro: new Date(),
      idrol:[null],

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
    this.formularioDeUsuarios.value['foto'] = btoa(binaryString);
    console.log(this.formularioDeUsuarios.value['foto']);
    this.imagenPrevisualizacion = this.formularioDeUsuarios.value['foto'];
  }


  ngOnInit(): void {
  }

  enviarDatos():any{
    
    console.log("Sujeto");
    console.log(this.formularioDeUsuarios.value);
    this.crudService.AgregarUsuario(this.formularioDeUsuarios.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-usuario');
    });

    
  }

}
