import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public state
  public token;
  public identidad;
  public user : User

  constructor(
    public userService:UsuarioService,
    private router:Router
  ) {
    this.identidad = this.userService.getIdentidad();
    this.user = new User("","","","","","","","");
   }

  ngOnInit(): void {
    this.state = "none"
  }

  about(){
    this.state = 'about'
  }

  login(){
    this.state = 'login'
  }

  iniciar(){
    this.userService.login(this.user).subscribe(
      response =>{
        console.log(response)
        this.identidad = response.userFound
        localStorage.setItem('identidad', JSON.stringify(this.identidad))
        this.getToken();
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.router.navigate(['/librera'])
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Email o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  getToken(){
    this.userService.login(this.user).subscribe(
      response=>{
        console.log(response)
        this.token=response.token;
        localStorage.setItem('token', JSON.stringify(this.token));
      }
    )
  }

}
