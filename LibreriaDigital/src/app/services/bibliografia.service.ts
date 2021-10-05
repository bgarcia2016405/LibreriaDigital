import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Bibliografia } from '../models/bibliogafria.model';

@Injectable({
  providedIn: 'root'
})
export class BibliografiaService {

  public url
  public headers = new HttpHeaders().set('Content-Type',  'application/json');
  public identidad;
  public token;

  constructor(
    public http:HttpClient
  ) {
    this.url = GLOBAL.url;
   }

   crearBibliografia(bibliografia):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())
    let params = JSON.stringify(bibliografia);

    return this.http.post(this.url + '/crearBibliografia', params, {headers: headersToken})
   }

   buscar(id):Observable<any>{
     return this.http.get(this.url + '/buscarId/' + id, {headers:this.headers})
   }

   editar(titulo,libro:Bibliografia):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())
    let params = JSON.stringify(libro);

    return this.http.put(this.url + '/editarBibliografia/' + titulo , params, {headers: headersToken} )
   }

  eliminar(titulo):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.delete(this.url + '/eliminarBibliografia/' + titulo, {headers:headersToken})
  }

   buscarPopular(tipo):Observable<any>{
    return this.http.get(this.url + '/buscarPopular/' + tipo, {headers: this.headers})
   }

   buscarTitulo(titulo,tipo):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.get(this.url + '/buscarTituloBiblio/' + titulo + '/' + tipo, {headers:headersToken})
   }

   buscarCopias(orden,tipo):Observable<any>{

    return this.http.get(this.url + '/buscarCopias/' + orden + '/' + tipo, {headers:this.headers})
   }

   buscarDisponibles(orden,tipo):Observable<any>{

    return this.http.get(this.url + '/buscarDisponibles/' + orden + '/' + tipo, {headers:this.headers})
   }

   buscarPlabra(palabra,tipo):Observable<any>{

    return this.http.get(this.url + '/buscarPlabra/' + palabra + '/' + tipo , {headers:this.headers})
   }

   reportPrestado(tipo):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.get(this.url + '/reportPrestado/' + tipo, {headers:headersToken})
   }

   reportBuscado(tipo):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.get(this.url + '/reportBuscado/' + tipo, {headers:headersToken})
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
