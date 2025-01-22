import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Login} from "../modelos/Login";
import {Registro} from "../modelos/Registro";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  private authState = new BehaviorSubject<boolean>(!!sessionStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();



  constructor(private http: HttpClient) {
  }
  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }


  loguear(login: Login): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/login`,login) ;
  }

  registrar(registro: Registro): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/registro/perfil`,registro) ;
  }

}
