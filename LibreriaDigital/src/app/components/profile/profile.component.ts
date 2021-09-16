import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public identidad

  constructor(
    public userService : UsuarioService
  ) {
    this.identidad = userService.getIdentidad();
  }

  ngOnInit(): void {

  }

  getIdentidad(){
    this.identidad = this.userService.getIdentidad();
  }

}
