import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(
    private readonly http: HttpClient
  ) { }

  //Metodo para obtener todos los usuarios
  getPaisByCode(code:string): Observable<any>{
    const urlPaises = `https://cors-anywhere.herokuapp.com/http://api.worldbank.org/v2/country/${code}?format=json`;
    const reqHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    return this.http.get<any>(urlPaises,{headers:reqHeaders})
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
