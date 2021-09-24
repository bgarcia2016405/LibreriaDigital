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
  public userChange: User;
  public userID: User;

  constructor(
    public bibliografiaService:BibliografiaService,
    public userService:UsuarioService,
  ) {
    this.identidad = this.userService.getIdentidad();
    this.user = new User("","","","","","","","");
    this.userID = new User("","","","","","","","");
    this.userChange = new User("","","","","","","","");
    this.biblio = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0);

  }

  ngOnInit(): void {
    this.listarUsuario()
  }

  agregarEstado(state){
    this.state = state
    this.userChange = null
    this.userID._id = ""
  }

  listarUsuario(){
    this.userService.listarUsuario().subscribe(
      response=>{
        this.user = response;
      }
    )
  }

  stage(){
    if(this.state == "Agregar"){
      this.userService.crearUsuario(this.userChange).subscribe(
        response=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.agregarEstado('Tabla')
        },error=>{
          console.log(<any>error);
          Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ya existe un usuario con ese CUI o carnet',
          showConfirmButton: false,
          timer: 1500
        })
        }
      )
    }else if(this.state == "Editar"){
      this.userService.editarUsuario(this.userChange,this.userChange._id).subscribe(
        reponse=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario fue editado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
          this.agregarEstado('Tabla')
        },error=>{
          console.log(<any>error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error editando al usuario',
            showConfirmButton: false,
            timer: 1500
          })
        }
      )
    }else if(this.state == "Eliminar"){
      Swal.fire({
        title: '¿Seguro que quieres eliminar al usuario?',
        text: "No podra ser reversible",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.isConfirmed) {

          this.userService.eliminarUsuario(this.userChange._id).subscribe(
            response=>{
              console.log(response)
              Swal.fire(
            'Eliminado',
            'La bibliografía fue eliminado',
            'success'
          )
            }
          )
          this.agregarEstado('Tabla')
        }
      })

    }

  }

  onChage(){

    this.userService.usuarioId(this.userID._id).subscribe(
      response=>{
        this.userChange = response
        console.log(this.userChange)
      }
    )

  }


}
