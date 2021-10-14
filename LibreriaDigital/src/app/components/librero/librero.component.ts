import { Component, OnInit } from '@angular/core';
import { Bibliografia } from '../../models/bibliogafria.model'
import { BibliografiaService } from 'src/app/services/bibliografia.service'
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PrestamosService } from 'src/app/services/prestamos.service';
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
  public busquedaCopias;
  public busquedaDisponible;
  public agregar: Bibliografia;

  constructor(
    public bibliografiaService:BibliografiaService,
    public userService:UsuarioService,
    public prestaService: PrestamosService
  ) {
    this.identidad = this.userService.getIdentidad();
    this.user = new User("","","","","","","","",0);
    this.biblio = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0)
    this.busqueda = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0)
    this.agregar = new Bibliografia("","","","","",[],[],"",0,0,0,"",0,0)
  }

  ngOnInit(): void {
    this.state = "srch"
    this.tipo = "Libro"
    this.bibliografia = "titulo"
    this.populares();
    console.log(this.identidad)
    this.busquedaCopias = "Mayor"
    this.busquedaDisponible = "Mayor"
  }

  buscarId(id){
    this.bibliografiaService.buscar(id).subscribe(
      response=>{
        this.busqueda = response
        console.log(this.busqueda)
      }
    )
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
    this.state = "book"
  }

  booc(){
    this.tipo = "Libro";
    this.populares();
    this.state = "book"
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
        this.state = "srch"
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

        this.libros = response
        console.log(this.libros)
        this.state = "srch"
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
    this.state = "book"
  }

  ttt(){
    console.log("titulo")
    this.bibliografia = "titulo"
    this.state = "book"
  }

  prestar(){
    this.prestaService.prestar(this.busqueda._id).subscribe(
      respnse=>{
        console.log(respnse)
        this.populares();
      },
      errror=>{
        console.log(<any>errror);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Bibliografía en posesión',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  verificacion(){
    Swal.fire({
      title: '¿Seguro que quieres prestar la bibliografía?',
      text: "No queremos accidentes",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'En posesión',
          'La bibliografía ahora esta con tigo',
          'success'
        )
        this.prestar();
        this.populares();
      }
    })
  }

  BusquedaCopiasMayor(){
    this.busquedaCopias = 'Menor';
    this.bibliografiaService.buscarCopias(this.busquedaCopias,this.tipo).subscribe(
      response=>{
        this.libros = response;
      }
    )
  }

  BusquedaCopiasMenor(){
    this.busquedaCopias = 'Mayor';
    this.bibliografiaService.buscarCopias(this.busquedaCopias,this.tipo).subscribe(
      response=>{
        this.libros = response;
      }
    )
  }

  BusquedaDisponibleMayor(){
    this.busquedaDisponible = 'Menor';
    this.bibliografiaService.buscarDisponibles(this.busquedaDisponible,this.tipo).subscribe(
      response=>{
        this.libros = response;
      }
    )
  }

  BusquedaDisponibleMenor(){
    this.busquedaDisponible = 'Mayor';
    this.bibliografiaService.buscarDisponibles(this.busquedaDisponible,this.tipo).subscribe(
      response=>{
        this.libros = response;
      }
    )
  }

  editarBiblio(){
    this.bibliografiaService.editar(this.busqueda.titulo,this.busqueda).subscribe(
      response=>{
        console.log(response)
        Swal.fire(
          'Editado',
          'La bibliografía fue editada exitosamente',
          'success'
        )
        this.populares()
      },
      errror=>{
        console.log(<any>errror);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error editando bibliografía',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  eliminarBiblio(titulo){
    Swal.fire({
      title: '¿Seguro que quieres eliminar la bibliografía?',
      text: "No podra ser reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.bibliografiaService.eliminar(titulo).subscribe(
          response=>{
            console.log(response)
            Swal.fire(
          'Eliminado',
          'La bibliografía fue eliminado',
          'success'
        )
          }
        )
      }
    })
    this.populares()
  }

  crear(){
    this.agregar.type = this.tipo
    this.bibliografiaService.crearBibliografia(this.agregar).subscribe(
      reponse=>{
        console.log(reponse)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bibliografía agregada',
          showConfirmButton: false,
          timer: 1500
        })
        this.populares();
      }
    )
  }


}
