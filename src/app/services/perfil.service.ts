import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../modelos/Perfil';
import { environment } from '../../environments/environment';
import {ComunService} from "./comun.service";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private comunService:ComunService) {}

  getPerfil(): Observable<Perfil> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Perfil>(`${this.apiUrl}/publicacion/perfil/mi`,authHeader );
  }
  actualizarDatosBiografia(datosBiografia: Perfil): Observable<Perfil> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<Perfil>(`${this.apiUrl}/biografia/actualizar`, datosBiografia, authHeader);
  }
}
