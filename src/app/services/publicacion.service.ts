import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Publicacion } from '../modelos/Publicacion';
import { ComunService } from './comun.service';
import {UsuarioDTO} from "../modelos/UsuarioDTO";

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private comunService: ComunService) {}

  getPublicaciones(): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/publicacion/all`, authHeader);
  }

  getMisPublicaciones(): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/publicacion/all/mi`, authHeader);
  }

  getPublicacionesSeguidos(): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/publicacion/segui`, authHeader);
  }

  guardarPublicacion(publicacion: Publicacion): Observable<Publicacion> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<Publicacion>(`${this.apiUrl}/publicacion/crear`, publicacion, authHeader);
  }

  eliminarPublicacion(id: number): Observable<any> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.delete<any>(`${this.apiUrl}/publicacion/${id}`, authHeader);
  }

  actualizarPublicacion(idPub: number, publicacionDTO: Publicacion): Observable<Publicacion> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.put<Publicacion>(`${this.apiUrl}/publicacion/${idPub}`, publicacionDTO, authHeader);
  }

  obtenerPublicacionPorId(idPub: number): Observable<Publicacion> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion>(`${this.apiUrl}/publicacion/${idPub}`, authHeader);
  }

  obtenerPublicacionesPorCorreo(correo: string): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/admin/publicaciones/${correo}`, authHeader);
  }

  unirsePublicacion(idPublicacion: number): Observable<void> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<void>(`${this.apiUrl}/publicacion/unirse/${idPublicacion}`, {}, authHeader);
  }

  obtenerUsuariosUnidos(idPublicacion: number): Observable<UsuarioDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<UsuarioDTO[]>(`${this.apiUrl}/publicacion/usuarios-unidos/${idPublicacion}`, authHeader);
  }

  salirPublicacion(idPublicacion: number): Observable<void> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.delete<void>(`${this.apiUrl}/publicacion/salir/${idPublicacion}`, authHeader);
  }

}
