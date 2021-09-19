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
  public state
  public tipo
  public busqueda : Bibliografia;
  public bibliografia

  constructor(
    public bibliografiaService:BibliografiaService,
    public userService:UsuarioService
  ) {
    this.identidad = this.userService.getIdentidad();
    this.user = new User("","","","","","","","");
    this.biblio = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0)
    this.busqueda = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0)
  }

  ngOnInit(): void {
    this.state = "book"
    this.tipo = "Libro"
    this.bibliografia = "titulo"
    this.populares();
  }

  populares(){
    this.bibliografiaService.buscarPopular(this.tipo).subscribe(
      response=>{
        this.libros = response
      }
    )
  }

  revis(){
    this.tipo = "Revista";
    this.populares();
  }

  booc(){
    this.tipo = "Libro";
    this.populares();
  }

  Busqueda(){
    if(this.bibliografia == "titulo"){
      this.buscarTitulo()
    }
    if(this.bibliografia == "palabra-clave"){
      this.buscarPalabra()
    }
  }

  buscarTitulo(){
    this.bibliografiaService.buscarTitulo(this.busqueda.titulo, this.tipo).subscribe(
      response=>{
        console.log(response)
        this.libros = response
      },error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error Buscando Bibliografía',
          showConfirmButton: false,
          timer: 1500
        })
      }

    )
  }

  buscarPalabra(){
    this.bibliografiaService.buscarPlabra(this.busqueda.titulo,this.tipo).subscribe(
      response=>{
        console.log(response)
      }, error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error Buscando Bibliografía',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  palabraClave(){
    console.log("palabra-clave")
    this.bibliografia = "palabra-clave"
  }

  ttt(){
    console.log("titulo")
    this.bibliografia = "titulo"

  }

}
