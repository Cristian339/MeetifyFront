import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ComunService } from './comun.service';
import {AmigoDTO} from "../modelos/AmigoDTO";

@Injectable({
  providedIn: 'root'
})
export class AmigoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) {}

  obtenerAmigos(): Observable<AmigoDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.http.get<AmigoDTO[]>(`${this.apiUrl}/seguidores/amigos`, authHeader).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 0) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
