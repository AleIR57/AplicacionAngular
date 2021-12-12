import { Component, OnInit } from '@angular/core';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  login: boolean = false;
  Usuario: any;
  admin: boolean = false;
  

  ngOnInit(): void {
    var accessTokenObj = localStorage.getItem('token');
    if(accessTokenObj){
      this.login = true;
      this.Usuario = decode(accessTokenObj);
      if(this.Usuario['idRol'] == 2){
        this.admin = true;
      }
    }
  }

  logout(){
    var accessTokenObj = localStorage.getItem('token');
    if(accessTokenObj){
      console.log(accessTokenObj);
      localStorage.removeItem('token');
      this.login = false;
      window.location.reload();
    }
    
  }
  
}
