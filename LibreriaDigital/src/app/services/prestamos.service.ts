import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  public url
  public headers = new HttpHeaders().set('Content-Type',  'application/json');
  public identidad;
  public token;

  constructor(
    public http:HttpClient
  ) {
    this.url = GLOBAL.url;
   }

  prestar(libro):Observable<any>{

    let headersToken = this.headers.set('Authorization', this.getToken())

    return this.http.get(this.url + '/prestar/' + libro, {headers: headersToken});
  }

  devolver(prestamo):Observable<any>{

    let headersToken = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/devolver/' + prestamo, {headers: headersToken} );

  }

  historial(id):Observable<any>{

    let headersToken = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/historial/' + id, {headers:headersToken});

  }

  posesion(id):Observable<any>{

    let headersToken = this.headers.set('Authorization', this.getToken());

    return this.http.get(this.url + '/posesion/' + id, {headers:headersToken});

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
