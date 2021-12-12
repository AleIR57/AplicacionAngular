import { Router } from '@angular/router';
import { AuthService } from './../servicio/auth.service';
import { CrudService } from 'src/app/servicio/crud.service';
import { Usuario } from './../servicio/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  Usuarios: any;

  constructor(public userService: CrudService, private authService: AuthService, private router: Router) {}

  
  ngOnInit(): void {
  }

 
  login() {
    const Usuario = {
      correo: this.email, 
      contrasena: this.password};
      /*this.userService.login(Usuario).subscribe(respuesta =>{
        console.log(respuesta);
        this.Usuarios=respuesta;
      });*/
      this.authService.singin(Usuario).subscribe( (res:any) =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/listar-usuario']);
      })
    console.log(this.email);
    console.log(this.password);
  }


  
}
