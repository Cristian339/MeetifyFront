import { Component, OnInit } from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import { settingsOutline, banOutline, arrowBackCircle, personCircleOutline, caretUpOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import { CommonModule} from "@angular/common";
import { FormsModule} from "@angular/forms";

@Component({
    selector: 'app-administracion',
    templateUrl: './administracion.component.html',
    styleUrls: ['./administracion.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        FormsModule
    ]
})
export class AdministracionComponent  implements OnInit {

  diasBaneo: number = 0;

  constructor() {

    addIcons( { settingsOutline, banOutline, personCircleOutline, arrowBackCircle, caretUpOutline } );
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

  aceptarBaneo() {
    console.log("Baneo temporal de " + this.diasBaneo + " días");
  }

}

