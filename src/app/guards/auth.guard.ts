import { AuthService } from './../servicio/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router){
    
  }

  canActivate():boolean{
    if(!this.authService.isAuth()){
      console.log("El token no es válido o ya expiró");
      this.router.navigate(['ingresar']);
      return false;
    }
    return true;
  }
  
}
