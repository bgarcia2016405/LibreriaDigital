import { Component, OnInit } from '@angular/core';
import { Bibliografia } from 'src/app/models/bibliogafria.model';
import { User } from 'src/app/models/user.model';
import { BibliografiaService } from 'src/app/services/bibliografia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {
  public libros;
  public identidad;
  public state;
  public user : User;
  public biblio : Bibliografia;


  constructor(
    public bibliografiaService:BibliografiaService,
    public userService:UsuarioService,
  ) {
    this.identidad = this.userService.getIdentidad();
    this.user = new User("","","","","","","","");
    this.biblio = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0)
  }

  ngOnInit(): void {
  }

}
