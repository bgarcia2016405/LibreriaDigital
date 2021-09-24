import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamos } from 'src/app/models/prestamos.model';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public identidad
  public tabla
  public state

  constructor(
    public userService : UsuarioService,
    public prestaService: PrestamosService,
    private router:Router
  ) {
    this.identidad = userService.getIdentidad();
    this.tabla = new Prestamos("","","","","");
  }

  ngOnInit(): void {
    this.tabla = null

  }

  getIdentidad(){

    this.identidad = this.userService.getIdentidad();
    this.tabla = null
  }

  historial(){
    this.prestaService.historial().subscribe(
      response=>{
        this.tabla = response
        console.log(response)
        this.state = "historial"
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
    this.prestaService.posesion().subscribe(
      response=>{
        this.tabla = response
        console.log(response)
        this.state = "posesion"
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

  devolver(id){
    this.prestaService.devolver(id).subscribe(
      response=>{
        console.log(response)

      }
    )
  }

  verificacion(id){
    Swal.fire({
      title: '¿Seguro que quieres devolver la bibliografía?',
      text: "Ya no podra revertir la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, devolver'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Grande!',
          'La bibliografía fue devuelta',
          'success'
        )
        this.devolver(id);
      }
    })
  }

}
