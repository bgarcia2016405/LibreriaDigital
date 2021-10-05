import { Component, OnInit } from '@angular/core';
import { Bibliografia } from 'src/app/models/bibliogafria.model';
import { Prestamos } from 'src/app/models/prestamos.model';
import { User } from 'src/app/models/user.model';
import { BibliografiaService } from 'src/app/services/bibliografia.service';
import { PrestamosService } from 'src/app/services/prestamos.service';
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
  public IDUserState
  public userTable: User;
  public tabla
  public stateInfo
  public userInfo: User;
  public userReport: User;
  public biblioReport: Bibliografia;

  constructor(
    public bibliografiaService:BibliografiaService,
    public userService:UsuarioService,
    public prestaService: PrestamosService
  ) {
    this.identidad = this.userService.getIdentidad();
    this.tabla = new Prestamos("","","","","");
    this.user = new User("","","","","","","","",0);
    this.userID = new User("","","","","","","","",0);
    this.userChange = new User("","","","","","","","",0);
    this.userTable = new User("","","","","","","","",0);
    this.userInfo = new User("","","","","","","","",0);
    this.userReport = new User("","","","","","","","",0);
    this.biblio = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0);
    this.biblioReport = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0);
  }

  ngOnInit(): void {
    this.listarUsuario()
    this.IDUserState = "Mayor"
    this.todos();
    this.reportUsuario();
  }

  agregarEstado(state){
    this.state = state
    this.userChange = null
    this.userID._id = ""
  }

  todos(){
    this.userService.listarUsuarioTodos().subscribe(
      response=>{
        this.userTable = response
        console.log(response)
      }
    )
  }

  listarUsuario(){
    this.userService.listarUsuario().subscribe(
      response=>{
        this.user = response;
      }
    )
  }

  buscarId(id){
    this.tabla = null
    this.userService.usuarioId(id).subscribe(
      response=>{

        this.userInfo = response
        console.log(this.userInfo)
      }
    )
  }

  editar(user){
    this.userChange = user
    console.log(this.userChange)
    this.state = 'Editar'
  }

  eliminar(user){
    this.userChange = user
    console.log(this.userChange)
    this.state = 'Eliminar'
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
      }
    )
  }

  historial(){
    console.log(this.userInfo)
    this.prestaService.historial(this.userInfo._id).subscribe(
      response=>{
        this.tabla = response
        console.log(response)
        this.stateInfo = "historial"
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No historial',
          showConfirmButton: false,
          timer: 1500
        })
    this.tabla = null

      }
    )
  }

  posesion(){
    this.prestaService.posesion(this.userInfo._id).subscribe(
      response=>{
        this.tabla = response
        console.log(response)
        this.stateInfo = "posesion"
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ningún poseido',
          showConfirmButton: false,
          timer: 1500
        })
    this.tabla = null
      }
    )
  }

  ordenUsuarios(orden){
    console.log(this.IDUserState, orden)
    this.IDUserState = orden
    this.userService.mostrarID(orden).subscribe(
      response=>{
        this.userTable = response
      }
    )
  }

  reportUsuario(){
    this.userService.reportUsuario().subscribe(
      response=>{
        this.userReport = response;
        console.log(response)
      }

    )
  }

}
