import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ComunService } from './comun.service';
import {Reputacion} from "../modelos/Reputacion";

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private comunService: ComunService) {}

  puntuarPublicacion(idPublicacion: number, estrellas: number, motivo: string): Observable<Reputacion> {
    const authHeader = this.comunService.autorizarPeticion();
    const body = { estrellas, motivo };
    return this.http.post<Reputacion>(`${this.apiUrl}/publicacion/${idPublicacion}/puntuar`, body, authHeader);
  }
}
