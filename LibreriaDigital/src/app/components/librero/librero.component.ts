import { Component, OnInit } from '@angular/core';
import { Bibliografia } from '../../models/bibliogafria.model'
import { BibliografiaService } from 'src/app/services/bibliografia.service'
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-librero',
  templateUrl: './librero.component.html',
  styleUrls: ['./librero.component.scss']
})
export class LibreroComponent implements OnInit {
  public libros;
  public identidad;
  public user : User;
  public biblio : Bibliografia;

  constructor(
    public bibliografiaService:BibliografiaService,
    public userService:UsuarioService
  ) {
    this.identidad = this.userService.getIdentidad();
    this.user = new User("","","","","","","","");
    this.biblio = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0)
  }

  ngOnInit(): void {
    this.populares();
  }

  populares(){
    this.bibliografiaService.buscarPopular().subscribe(
      response=>{
        this.libros = response
      }
    )
  }

  buscarTitulo(titulo){
    this.bibliografiaService.buscarTitulo(titulo).subscribe(
      response=>{
        this.biblio = response
      }
    )
  }

}
