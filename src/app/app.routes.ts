import { Routes } from '@angular/router';
import { AuthComponentComponent} from "./auth-component/auth-component.component";
import { MensajeriaComponent} from "./mensajeria/mensajeria.component";
import { NavbarComponent} from "./navbar/navbar.component";
import { AdministracionComponent} from "./administracion/administracion.component";
import { BienvenidosComponent} from "./bienvenidos/bienvenidos.component";
import { CategoriasComponent} from "./categorias/categorias.component";

export const routes: Routes = [
  {
    path: 'autentificación',
    pathMatch: "full", component: AuthComponentComponent
  },
  {
    path: 'mensajeria',
    pathMatch: "full", component: MensajeriaComponent
  },
  {
    path: 'navbar',
    pathMatch: "full", component: NavbarComponent
  },
  {
    path: 'administración',
    pathMatch: "full", component: AdministracionComponent
  },
  {
    path: 'bienvenidos',
    pathMatch: "full", component: BienvenidosComponent
  },
  {
    path: 'categorias',
    pathMatch: 'full', component: CategoriasComponent
  },
  {
    path: '',
    redirectTo: 'categorias',
    pathMatch: 'full',
  },
];
