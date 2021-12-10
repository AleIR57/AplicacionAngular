import { Router } from '@angular/router';
import { CrudService } from 'src/app/servicio/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-oferta',
  templateUrl: './agregar-oferta.component.html',
  styleUrls: ['./agregar-oferta.component.css']
})
export class AgregarOfertaComponent implements OnInit {

  formularioDeOfertas:FormGroup;


  constructor(public formulario:FormBuilder,
    private crudService: CrudService, private ruteador:Router) { 
    this.formularioDeOfertas=this.formulario.group({
      idUsuario:[null],
      idProducto:[null],
      idEstado:[null],
      precio:[null],
      fecha: new Date,

    })
  }


  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log("Sujeto");
    console.log(this.formularioDeOfertas.value);
    this.crudService.AgregarOferta(this.formularioDeOfertas.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-oferta');
    });

    
  }

}
