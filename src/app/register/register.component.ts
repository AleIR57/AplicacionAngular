import { Router } from '@angular/router';
import { CrudService } from 'src/app/servicio/crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formularioDeUsuarios!:FormGroup;
  Roles:any;
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
      idrol:[1],

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
    console.log("Esta es la imagen", this.formularioDeUsuarios.value['foto']);
    this.imagenPrevisualizacion = this.formularioDeUsuarios.value['foto'];
  }


  ngOnInit(): void {
  }

  enviarDatos():any{
    this.formularioDeUsuarios.value['foto'] = this.imagenPrevisualizacion;
    console.log("Esta es la imagen", this.formularioDeUsuarios.value['foto']);
    console.log("Sujeto");
    console.log(this.formularioDeUsuarios.value);
    
    this.crudService.RegistrarUsuario(this.formularioDeUsuarios.value).subscribe(respuesta =>{
     
      this.ruteador.navigateByUrl('/ingresar');
    });

    
  }

}
