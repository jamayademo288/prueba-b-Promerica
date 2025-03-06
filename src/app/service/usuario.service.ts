import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'https://649088911e6aa71680cb6c15.mockapi.io/users';

  constructor(
    private readonly http: HttpClient
  ) { }

  //Metodo para obtener todos los usuarios
  getUsuarios(): Observable<any>{
    const reqHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.get<any>(this.url,{headers:reqHeaders})
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
