import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje } from '../modelos/Mensaje';
import {environment} from "../../environments/environment";
import {UltimoMensaje} from "../modelos/UltimoMensaje";

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerMensajesPorRoomId(roomId: string): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.apiUrl}/mensajes/${roomId}`);

  }

  obtenerUltimoMensajePorRoomId(roomId: string): Observable<UltimoMensaje> {
    return this.http.get<UltimoMensaje>(`${this.apiUrl}/mensajes/ultimo/${roomId}`);
  }
}
