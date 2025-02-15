import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ComunService} from "./comun.service";

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  // Aquí la URL base para la API
  private apiUrl = 'http://localhost:8080/publicacion/perfil/actualizar-categorias'; // URL del backend

  constructor(private http: HttpClient, private comunService: ComunService) {}

  // Método para actualizar las categorías, ahora con el correo como parámetro en la URL
  actualizarCategorias(categorias: string[]): Observable<void> {
    const authHeader = this.comunService.autorizarPeticion();
    // Concatenamos el correo a la URL
    const urlConCorreo = `${this.apiUrl}`;
    // Enviamos la solicitud POST con el cuerpo de las categorías
    return this.http.post<void>( urlConCorreo, categorias, authHeader);
  }
}
