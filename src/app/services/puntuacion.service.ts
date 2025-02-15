import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {
  }


}
