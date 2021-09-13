import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import {UsuarioService} from '../../services/usuario.service'

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
    public userService:UsuarioService
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
