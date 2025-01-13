import { Routes } from '@angular/router';
import { LoginComponent} from "./login/login.component";
import { RegistroComponent } from './registro/registro.component';
import { ConfirmacionCorreoComponent} from "./confirmacion-correo/confirmacion-correo.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.component').then((m) => m.RegistroComponent)
  },
  {
    path: 'confirmacionCorreo',
    loadComponent: () => import('./confirmacion-correo/confirmacion-correo.component').then((m) => m.ConfirmacionCorreoComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
