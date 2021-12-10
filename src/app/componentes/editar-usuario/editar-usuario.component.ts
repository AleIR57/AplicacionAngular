import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  elID: any;
  formularioDeUsuarios:FormGroup;
  imagenPrevisualizacion:any;
  Roles:any;
  idRol: any


  constructor(
    private activateRoute:ActivatedRoute,
    private crudService:CrudService,
    public formulario:FormBuilder,
    private ruteador: Router
  ) { 

    this.crudService.ObtenerRoles().subscribe(respuesta =>{
      console.log(respuesta);
      this.Roles=respuesta;
    });

    this.elID=this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.elID);
    this.crudService.ObtenerUsuario(this.elID).subscribe(respuesta =>{
      this.imagenPrevisualizacion = respuesta[0]['foto'];
      console.log(respuesta);
      this.formularioDeUsuarios.setValue({
        nombre:respuesta[0]['nombre'],
        apellido:respuesta[0]['apellido'],
        correo:respuesta[0]['correo'],
        contrasena:respuesta[0]['contrasena'],
        telefono:respuesta[0]['telefono'],
        direccion:respuesta[0]['direccion'],
        cedula:respuesta[0]['cedula'],
        foto:respuesta[0]['foto'],
        fecharegistro:[null],
        idRol:respuesta[0]['idRol'],
      });
    });

    

    this.formularioDeUsuarios = this.formulario.group({
      nombre:[''],
      apellido:[''],
      correo:[''],
      contrasena:[''],
      telefono:[null],
      direccion:[null],
      cedula:[''],
      foto:[''],
      fecharegistro: [null],
      idRol:[null],
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
    this.formularioDeUsuarios.value['foto'] = btoa(binaryString);
 
    this.imagenPrevisualizacion = this.formularioDeUsuarios.value['foto'];
    console.log(this.formularioDeUsuarios.value['foto']);
  }

  ngOnInit(): void {
  }

  enviarDatos():any{
    this.formularioDeUsuarios.value['foto'] = this.imagenPrevisualizacion;
    console.log(this.elID);
    console.log(this.formularioDeUsuarios.value);
    this.crudService.EditarUsuario(this.elID, this.formularioDeUsuarios.value).subscribe(respuesta =>{
      this.ruteador.navigateByUrl('/listar-usuario');
    });
    
  }

}
