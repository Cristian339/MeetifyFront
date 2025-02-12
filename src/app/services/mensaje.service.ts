import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje } from '../modelos/Mensaje';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerMensajesPorRoomId(roomId: string): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.apiUrl}/mensajes/${roomId}`);

  }
}
