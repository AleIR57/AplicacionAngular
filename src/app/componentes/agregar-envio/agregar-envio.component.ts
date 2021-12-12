import { Coordenada } from './../../servicio/Usuario';
import { GoogleMapsModule } from '@angular/google-maps';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/servicio/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {MouseEvent} from "@agm/core";

@Component({
  selector: 'app-agregar-envio',
  templateUrl: './agregar-envio.component.html',
  styleUrls: ['./agregar-envio.component.css']
})
export class AgregarEnvioComponent implements OnInit {

  formularioDeEnvios:FormGroup;
  elID: any;
  Ofertas:any;
  idOferta: any;
  center = {lat: 4.570868, lng: -74.297333};
  zoom = 6;
  display?: google.maps.LatLngLiteral;
  ubicacionCentral!: Coordenada;
  ubicacionEnProceso!: Coordenada;

  coordenadas!: Coordenada;

  

  constructor(public formulario:FormBuilder,
    private crudService: CrudService, private ruteador:Router,
    private activateRoute:ActivatedRoute,) { 
      let coordAux = new Coordenada(4.570868, -74.297333);
      this.coordenadas = coordAux;

    
      this.elID=this.activateRoute.snapshot.paramMap.get('id');

      this.crudService.ObtenerOferta(this.elID).subscribe(respuesta =>{
        console.log(respuesta);
          this.idOferta = respuesta[0]['idOferta'];
      });

    this.formularioDeEnvios=this.formulario.group({
      idOferta:[this.elID],
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
    this.ubicacionCentral = new Coordenada( 4.570868, -74.297333);
  }

  enviarDatos():any{
    console.log("Sujeto");
    console.log(this.formularioDeEnvios.value);
    this.formularioDeEnvios.value['latitud'] = this.coordenadas.latitud;
    this.formularioDeEnvios.value['longitud'] = this.coordenadas.longitud;
    this.crudService.AgregarEnvio(this.formularioDeEnvios.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-envio');
    });

    
  }

  mapClicked($event: MouseEvent){
    let coord = new Coordenada($event.coords.lat, $event.coords.lng);
    this.coordenadas = coord;
  }

}
