import { Routes } from '@angular/router';
import { AuthComponentComponent} from "./auth-component/auth-component.component";
import { MensajeriaComponent} from "./mensajeria/mensajeria.component";
import { NavbarComponent} from "./navbar/navbar.component";

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
    path: '',
    redirectTo: 'mensajeria',
    pathMatch: 'full',
  },
];
