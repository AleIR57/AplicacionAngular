
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


  constructor(public formulario:FormBuilder,
    private crudService: CrudService, private ruteador:Router) { 
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
