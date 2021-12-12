import { Usuario } from './../servicio/Usuario';
import { AuthService } from './../servicio/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import  decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService,
    public router:Router){

  }

  Usuario!: Usuario;

  
  canActivate(route: ActivatedRouteSnapshot):boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token') as string;
    this.Usuario = decode(token);
    console.log(this.Usuario['nombre'] + '' + this.Usuario['idRol']);

    if(!this.authService.isAuth() || this.Usuario['idRol'] !== expectedRole){
      console.log("Usuario no autorizado para la vista");
      this.router.navigate(['/ingresar']);
      return false;
    }
    return true;
    
  }
  
}
