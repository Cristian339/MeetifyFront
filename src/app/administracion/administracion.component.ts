import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { settingsOutline, banOutline, arrowBackCircle, personCircleOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import { CommonModule} from "@angular/common";

@Component({
    selector: 'app-administracion',
    templateUrl: './administracion.component.html',
    styleUrls: ['./administracion.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule
    ]
})
export class AdministracionComponent  implements OnInit {

  constructor() {

    addIcons( { settingsOutline, banOutline, personCircleOutline, arrowBackCircle } );
  }

  ngOnInit() {}

  vistaActual: 'admin' | 'users' | 'baneados' = 'admin';

  viajarA(view: 'admin' | 'users' | 'baneados') {
    this.vistaActual = view;
  }

  cambiarTitulo(): string {
    switch (this.vistaActual) {
      case 'admin':
        return 'Administración';
      case 'users':
        return 'Usuarios';
      case 'baneados':
        return 'Lista de Baneados';
      default:
        return '';
    }
  }
}

