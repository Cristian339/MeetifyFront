import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversacion } from '../modelos/Conversacion';
import { Mensaje } from '../modelos/Mensaje';
import { SeguidorDTO } from '../modelos/SeguidorDTO';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private baseUrl = '/chat';

  constructor(private http: HttpClient) {}

  getConversacionesByIdPerfil(idPerfil: number): Observable<Conversacion[]> {
    return this.http.get<Conversacion[]>(`${this.baseUrl}/conversaciones/${idPerfil}`);
  }

  obtenerMensajesPorConversacionId(conversacionId: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.baseUrl}/conversacion/${conversacionId}`);
  }

  enviarMensaje(mensaje: Mensaje): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/enviar`, mensaje);
  }

  crearConversacion(usuario1Id: number, usuario2Id: number): Observable<Conversacion> {
    return this.http.post<Conversacion>(`${this.baseUrl}/crear-conversacion`, { usuario1Id, usuario2Id });
  }

  editarMensaje(mensajeId: number, mensaje: Mensaje): Observable<Mensaje> {
    return this.http.put<Mensaje>(`${this.baseUrl}/editar/${mensajeId}`, mensaje);
  }

  eliminarMensaje(mensajeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminar/${mensajeId}`);
  }

  obtenerSeguidores(): Observable<SeguidorDTO[]> {
    return this.http.get<SeguidorDTO[]>(`${this.baseUrl}/seguidores`);
  }
}
