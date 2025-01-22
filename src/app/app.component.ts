import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {NavbarComponent} from "./navbar/navbar.component";
import {PiePaginaComponent} from "./pie-pagina/pie-pagina.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {

  }
}
