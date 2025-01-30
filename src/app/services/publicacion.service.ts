import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Publicacion } from '../modelos/Publicacion';
import { ComunService } from './comun.service';

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


}
