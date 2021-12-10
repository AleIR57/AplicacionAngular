import { CrudService } from 'src/app/servicio/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-envio',
  templateUrl: './editar-envio.component.html',
  styleUrls: ['./editar-envio.component.css']
})
export class EditarEnvioComponent implements OnInit {

  elID: any;
  formularioDeEnvios:FormGroup;
  imagenPrevisualizacion:any;

  constructor(
    private activateRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador: Router
  ) { 
    this.elID=this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.elID);
    this.crudService.ObtenerEnvio(this.elID).subscribe(respuesta =>{
      console.log(respuesta);
      this.formularioDeEnvios.setValue({
        idOferta:respuesta[0]['idOferta'],
        codigoPostal:respuesta[0]['codigoPostal'],
        barrio:respuesta[0]['barrio'],
        ciudad:respuesta[0]['ciudad'],
        direccion:respuesta[0]['direccion'],
        referencia:respuesta[0]['referencia'],
        latitud:respuesta[0]['latitud'],
        longitud:respuesta[0]['longitud'],
      });
    });
    

    this.formularioDeEnvios = this.formulario.group({
      idOferta:[null],
      codigoPostal:[null],
      barrio:[''],
      ciudad:[''],
      direccion:[''],
      referencia:[''],
      latitud:[''],
      longitud:[''],
    });

       

  }


  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log(this.elID);
    console.log(this.formularioDeEnvios.value);
    this.crudService.EditarEnvio(this.elID, this.formularioDeEnvios.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-envio');
    });
    
  }

}
