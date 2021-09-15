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

   buscarPopular():Observable<any>{
    return this.http.get(this.url + '/buscarPopular', {headers: this.headers})
   }

   buscarTitulo(titulo):Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.get(this.url + '/buscarTituloBiblio/' + titulo, {headers:headersToken})
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
