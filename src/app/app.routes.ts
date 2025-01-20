import { Routes } from '@angular/router';
import { AuthComponentComponent } from './auth-component/auth-component.component';

export const routes: Routes = [
  { path: 'autentificación', pathMatch: 'full', component: AuthComponentComponent },
  { path: '', redirectTo: 'autentificación', pathMatch: 'full' },
  { path: 'navbar', loadComponent: () => import('./navbar/navbar.component').then((m) => m.NavbarComponent) },
  { path: 'pie-pagina', loadComponent: () => import('./pie-pagina/pie-pagina.component').then((m) => m.PiePaginaComponent) },
  { path: 'publicacion', loadComponent: () => import('./publicacion/publicacion.component').then((m) => m.PublicacionComponent) },
  { path: 'editar-perfil', loadComponent: () => import('./editar-perfil/editar-perfil.component').then((m) => m.EditarPerfilComponent) },
];
