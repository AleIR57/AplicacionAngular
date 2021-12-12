import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';
  

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  singin(datosUsuario:any){
    return this.http.post(`${this.URL}/Usuario/singin`, datosUsuario);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token') as string;
    if( this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }

}
