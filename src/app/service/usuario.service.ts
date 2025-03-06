import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private readonly http: HttpClient
  ) { }

  //Metodo para obtener todos los usuarios
  getUsuarios(): Observable<any>{
    const url = 'https://649088911e6aa71680cb6c15.mockapi.io/users';
    const reqHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.get<any>(url,{headers:reqHeaders})
    .pipe( //elemento rxjs para el manejo de errores
        catchError(this.errorHandler)
    )
  }

  getUsuariosBySearch(search:string): Observable<any>{
    const url = `https://649088911e6aa71680cb6c15.mockapi.io/users?search=${search}`;
    const reqHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.get<any>(url,{headers:reqHeaders})
    .pipe( //elemento rxjs para el manejo de errores
        catchError(this.errorHandler)
    )
  }

  getAvatar(name: string, lastname: string): Observable<any>{
    const url = `http://ui-avatars.com/api/?name=${name}+${lastname}`;
    const reqHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.get<any>(url,{headers:reqHeaders})
    .pipe( //elemento rxjs para el manejo de errores
        catchError(this.errorHandler)
    )
  }

  //Metodo que manejara los errores de las peticiones http
  errorHandler(error:HttpErrorResponse){
    console.log(error)
    return throwError(() => new Error(error.message || 'Problemas con el servidor'))
  }


}
