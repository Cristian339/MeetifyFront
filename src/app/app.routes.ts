import { Routes } from '@angular/router';
import { AuthComponentComponent} from "./auth-component/auth-component.component";

export const routes: Routes = [
  {
    path: 'autentificación',
    pathMatch: "full", component: AuthComponentComponent
  },
  {
    path: '',
    redirectTo: 'autentificación',
    pathMatch: 'full',
  },
];
