import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../modelos/Perfil';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getPerfil(id: number): Observable<Perfil> {
    return this.httpClient.get<Perfil>(`${this.apiUrl}/publicacion/perfil/${id}`);
  }
}
