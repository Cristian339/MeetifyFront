import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../modelos/Perfil';
import { environment } from '../../environments/environment';
import { ComunService } from './comun.service';
import { Publicacion } from '../modelos/Publicacion';
import {Categoria} from "../modelos/Categoria";
import {SeguidorDTO} from "../modelos/SeguidorDTO";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private comunService: ComunService) {}

  getPerfil(): Observable<Perfil> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Perfil>(`${this.apiUrl}/publicacion/perfil/mi`, authHeader);
  }

  // actualizarDatosBiografia(datosBiografia: Perfil): Observable<Perfil> {
  //   const authHeader = this.comunService.autorizarPeticion();
  //   return this.httpClient.post<Perfil>(`${this.apiUrl}/biografia/actualizar`, datosBiografia, authHeader);
  // }


  actualizarDatosBiografia(datosBiografia: Perfil, correoElectronico: string): Observable<Perfil> {
    const urlConCorreo = `${this.apiUrl}/biografia/actualizar/${correoElectronico}`;
    return this.httpClient.post<Perfil>(urlConCorreo,datosBiografia);
  }

  compartirPublicacion(publicacionId: number | undefined): Observable<any> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post(`${this.apiUrl}/publicacion/perfil/compartir/${publicacionId}`, {},authHeader );
  }

  obtenerPublicacionesCompartidas(): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/publicacion/perfil/compartidos`, authHeader);
  }

  getPerfilesBaneados(): Observable<Perfil[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Perfil[]>(`${this.apiUrl}/admin/baneados`, authHeader);
  }

  getPerfilesNoBaneados(): Observable<Perfil[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Perfil[]>(`${this.apiUrl}/admin/nobaneados`, authHeader);
  }

  banearPerfil(correo: string | undefined): Observable<void> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<void>(`${this.apiUrl}/admin/ban/${correo}`, authHeader);
  }


  borrarCuenta(contrasenia: string | undefined): Observable<void> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<void>(`${this.apiUrl}/publicacion/perfil/eliminar/${contrasenia}`, {} ,authHeader);
  }



  categoriasPerfil(): Observable<Categoria[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}/publicacion/perfil/categorias`, authHeader);
  }

  obtenerSeguidores(): Observable<SeguidorDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<SeguidorDTO[]>(`${this.apiUrl}/seguidores/seguidores`, authHeader);
  }

  obtenerSeguidos(): Observable<SeguidorDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<SeguidorDTO[]>(`${this.apiUrl}/seguidores/seguidos`, authHeader);
  }

  obtenerAmigos(): Observable<SeguidorDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<SeguidorDTO[]>(`${this.apiUrl}/seguidores/amigos`, authHeader);
  }

  seguirUsuario(idUsuarioASeguir: number): Observable<void> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<void>(`${this.apiUrl}/seguidores/seguir/${idUsuarioASeguir}`, {}, authHeader);
  }

  dejarUsuario(idUsuarioADejarDeSeguir: number): Observable<void> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<void>(`${this.apiUrl}/seguidores/dejar-de-seguir/${idUsuarioADejarDeSeguir}`, {}, authHeader);
  }
}
