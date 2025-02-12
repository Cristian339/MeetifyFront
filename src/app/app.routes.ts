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
import { PerfilComponent } from './perfil/perfil.component';
import {DatosBiograficosComponent} from "./datos-biograficos/datos-biograficos.component";
import { GestionPublicacionComponent} from "./gestion-publicacion/gestion-publicacion.component";
import { GestionarPublicacionesComponent} from "./gestionar-publicaciones/gestionar-publicaciones.component";
import { UnirseEventoComponent} from "./unirse-evento/unirse-evento.component";
import{ PuntuarComponent} from "./puntuar/puntuar.component";
import {UsuPubliComponent} from "./usu-publi/usu-publi.component";
// import { EventoMiembroComponent} from "./evento-miembro/evento-miembro.component";

export const routes: Routes = [
  { path: '', redirectTo: 'autentificacion', pathMatch: 'full' },
  { path: 'autentificacion', component: AuthComponentComponent },
  { path: 'mensajeria', component: MensajeriaComponent },
  { path: 'navbar', component: CabeceraComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'bienvenidos', component: BienvenidosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'pie-pagina', component: PiePaginaComponent },
  { path: 'publicacion', component: PublicacionComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'sobre-ti', component: DatosBiograficosComponent },
  { path: 'gestion-publicacion', component: GestionPublicacionComponent },
  { path: 'gestionar-publicaciones', component: GestionarPublicacionesComponent },
  { path: 'usu-publi/:correo', component: UsuPubliComponent },

  { path: 'gestionar-publicaciones', component: GestionarPublicacionesComponent },
  { path: 'unirse-evento', component: UnirseEventoComponent },
  { path: 'puntuar', component: PuntuarComponent},
  // { path: 'evento-miembro', component: EventoMiembroComponent}
];
