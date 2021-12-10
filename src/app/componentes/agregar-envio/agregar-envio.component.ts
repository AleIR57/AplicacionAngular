import { Router } from '@angular/router';
import { CrudService } from 'src/app/servicio/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-envio',
  templateUrl: './agregar-envio.component.html',
  styleUrls: ['./agregar-envio.component.css']
})
export class AgregarEnvioComponent implements OnInit {

  formularioDeEnvios:FormGroup;


  constructor(public formulario:FormBuilder,
    private crudService: CrudService, private ruteador:Router) { 
    this.formularioDeEnvios=this.formulario.group({
      idOferta:[null],
      codigoPostal:[null],
      barrio:[''],
      ciudad:[''],
      direccion:[''],
      referencia:[''],
      latitud:[''],
      longitud:[''],

    })
  }


  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log("Sujeto");
    console.log(this.formularioDeEnvios.value);
    this.crudService.AgregarEnvio(this.formularioDeEnvios.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-envio');
    });

    
  }

}
