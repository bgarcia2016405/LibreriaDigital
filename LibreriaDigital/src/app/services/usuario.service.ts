import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: String;
  public headers = new HttpHeaders().set('Content-Type',  'application/json');
  public identidad;
  public token;

  constructor(
    public http:HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  login(usuario):Observable<any>{
    let params = JSON.stringify(usuario);

    return this.http.post(this.url + '/Login' , params, {headers: this.headers});
  }

  crearUsuario(usuario):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())
    let params = JSON.stringify(usuario);

    return this.http.post(this.url + '/crearUsuario', params, {headers: headersToken})
  }

  cr(usuario):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())
    let params = JSON.stringify(usuario);

    return this.http.post(this.url + '/crearUsuario', params, {headers: headersToken})
  }

  editarUsuario(usuario,id):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())
    let params = JSON.stringify(usuario);

    return this.http.put(this.url + '/actualizarUsuario/' + id, params, {headers: headersToken})
  }

  eliminarUsuario(id):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken());

    return this.http.delete(this.url + '/eliminarUsuario/' + id,{headers:headersToken})
  }

  usuarioId(id):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/usuarioId/' + id, {headers:headersToken})
  }

  listarUsuarioTodos():Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/listarUsuarios',  {headers:headersToken})
  }

  listarUsuario():Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/mostrarTipoUsuario/estudiante',  {headers:headersToken})
  }

  mostrarID(orde):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/mostrarId/' + orde,  {headers:headersToken})
  }

  reportUsuario():Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/reportUsuario' , {headers: headersToken});
  }

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem("identidad"))
    if(identidad2 != undefined){
       this.identidad = identidad2;
    }else{
       this.identidad = null;
    }

    return this.identidad;
 }

  getToken(){
    var token2 = localStorage.token;
    if(token2 != undefined){
      this.token = token2;
    }else{
      this.token = null
    }
    return this.token
}


}
