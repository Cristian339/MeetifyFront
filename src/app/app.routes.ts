import { Routes } from '@angular/router';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { MensajeriaComponent } from './mensajeria/mensajeria.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { BienvenidosComponent } from './bienvenidos/bienvenidos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

export const routes: Routes = [
  { path: 'autentificación', component: AuthComponentComponent },
  { path: '', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'mensajeria', component: MensajeriaComponent },
  { path: 'navbar', component: CabeceraComponent },
  { path: 'administración', component: AdministracionComponent },
  { path: 'bienvenidos', component: BienvenidosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'pie-pagina', component: PiePaginaComponent },
  { path: 'publicacion', component: PublicacionComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },
];
