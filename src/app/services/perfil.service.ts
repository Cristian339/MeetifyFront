import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../modelos/Perfil';
import { environment } from '../../environments/environment';
import { ComunService } from './comun.service';
import { Publicacion } from '../modelos/Publicacion';
import {Categoria} from "../modelos/Categoria";
import {SeguidorDTO} from "../modelos/SeguidorDTO";
import {PerfilID} from "../modelos/PerfilID";

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

  getIDPerfil(): Observable<PerfilID> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<PerfilID>(`${this.apiUrl}/publicacion/perfil/mi-id`, authHeader);
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


  obtenerPublicacionesCompartidasOtro(id : number | undefined): Observable<Publicacion[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Publicacion[]>(`${this.apiUrl}/publicacion/perfil/compartidos-otro/${id}`, authHeader);
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

  categoriasOtroPerfil(id: number | undefined): Observable<Categoria[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}/publicacion/perfil/categorias-otro/${id}`, authHeader);
  }

  obtenerSeguidores(): Observable<SeguidorDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<SeguidorDTO[]>(`${this.apiUrl}/seguidores/seguidores`, authHeader);
  }

  obtenerSeguidoresOtro(id : number | undefined): Observable<SeguidorDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<SeguidorDTO[]>(`${this.apiUrl}/seguidores/seguidores-otro/${id}`, authHeader);
  }

  obtenerSeguidos(): Observable<SeguidorDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<SeguidorDTO[]>(`${this.apiUrl}/seguidores/seguidos`, authHeader);
  }

  obtenerSeguidosOtro(id : number | undefined): Observable<SeguidorDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<SeguidorDTO[]>(`${this.apiUrl}/seguidores/seguidos-otro/${id}`, authHeader);
  }

  obtenerAmigos(): Observable<SeguidorDTO[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<SeguidorDTO[]>(`${this.apiUrl}/seguidores/amigos`, authHeader);
  }

  seguirUsuario(idUsuarioASeguir: number | undefined): Observable<void> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<void>(`${this.apiUrl}/seguidores/seguir/${idUsuarioASeguir}`, {}, authHeader);
  }

  dejarUsuario(idUsuarioADejarDeSeguir: number | undefined): Observable<void> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<void>(`${this.apiUrl}/seguidores/dejar-de-seguir/${idUsuarioADejarDeSeguir}`, {}, authHeader);
  }

  comprobarSiSiguesUsuario(id: number | undefined): Observable<boolean> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<boolean>(`${this.apiUrl}/seguidores/comprobar/${id}`, authHeader);
  }

  actualizarPerfil(perfilDTO: Perfil): Observable<Perfil> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.put<Perfil>(`${this.apiUrl}/publicacion/perfil/actualizar`, perfilDTO, authHeader);
  }

  anadirCategoriaExistenteAPerfil(categoriaDTO: Categoria): Observable<Categoria> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.post<Categoria>(`${this.apiUrl}/publicacion/perfil/anadir-categoria`, categoriaDTO, authHeader);
  }

  eliminarCategoriaPreferenteDePerfil(categoriaDTO: Categoria): Observable<string> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.delete<string>(`${this.apiUrl}/publicacion/perfil/eliminar`, {
      headers: authHeader.headers,
      body: categoriaDTO,
    });
  }

  verTodasLasCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}/publicacion/perfil/todas`);
  }

  verCategoriasElegidasPorPerfil(): Observable<Categoria[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}/publicacion/perfil/elegidas`, authHeader);
  }

  verCategoriasNoElegidasPorPerfil(): Observable<Categoria[]> {
    const authHeader = this.comunService.autorizarPeticion();
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}/publicacion/perfil/noelegidas`, authHeader);
  }

}
