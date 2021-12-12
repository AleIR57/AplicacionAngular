import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  singin(datosUsuario:any){
    return this.http.post(`${this.URL}/Usuario/singin`, datosUsuario);
  }
}
