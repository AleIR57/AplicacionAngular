import { CrudService } from 'src/app/servicio/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-oferta',
  templateUrl: './editar-oferta.component.html',
  styleUrls: ['./editar-oferta.component.css']
})
export class EditarOfertaComponent implements OnInit {

  elID: any;
  formularioDeOfertas:FormGroup;
  imagenPrevisualizacion:any;

  constructor(
    private activateRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador: Router
  ) { 
    this.elID=this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.elID);
    this.crudService.ObtenerOferta(this.elID).subscribe(respuesta =>{
      console.log(respuesta);
      this.formularioDeOfertas.setValue({
        idUsuario:respuesta[0]['idUsuario'],
        idProducto:respuesta[0]['idProducto'],
        idEstado:respuesta[0]['idEstado'],
        precio:respuesta[0]['precio'],
        fecha:respuesta[0]['fecha']
      });
    });
    

    this.formularioDeOfertas = this.formulario.group({
      idUsuario:[null],
      idProducto:[null],
      idEstado:[null],
      precio:[null],
      fecha:[''],
    });

       

  }


  ngOnInit(): void {
  }

  enviarDatos():any{
    console.log(this.elID);
    console.log(this.formularioDeOfertas.value);
    this.crudService.EditarOferta(this.elID, this.formularioDeOfertas.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-oferta');
    });
    
  }

}
