// categorias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private apiUrl = 'http://localhost:8080/publicacion/perfil/actualizar-categorias'; // URL del backend

  constructor(private http: HttpClient) {}

  // Método para enviar las categorías seleccionadas
  actualizarCategorias(categorias: string[]): Observable<void> {
    return this.http.post<void>(this.apiUrl, categorias);
  }
}
