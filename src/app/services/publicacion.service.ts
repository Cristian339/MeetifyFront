import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Publicacion} from "../modelos/Publicacion";
import {ComunService} from "./comun.service";

@Injectable({
  providedIn: 'root'
})

export class PublicacionService{

  constructor(private httpClient: HttpClient, private comunService:ComunService){}


  getPublicaciones(): Observable<Publicacion[]>{
    const authHeader = this.comunService.autorizarPeticion()
    return this.httpClient.get<any>(`http://localhost:8080/publicacion/all`, authHeader) ;
  }

  getPublicacionesSeguidos(): Observable<Publicacion[]>{
    const authHeader = this.comunService.autorizarPeticion()
    return this.httpClient.get<any>(`http://localhost:8080/publicacion/segui`, authHeader) ;
  }
}
