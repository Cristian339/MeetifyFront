import { Component } from '@angular/core';
import {CabeceraComponent} from "../cabecera/cabecera.component";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  imports: [
    CabeceraComponent,
    IonicModule,
    NgForOf
  ],
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent {
  notificaciones = [
    {
      usuario: 'Luna',
      mensaje: 'Luna te mencionó en una publicación.',
      fecha: 'Ahora',
      imagen: 'https://picsum.photos/500/300?random=4',
      accion: true,
      accionTexto: 'Seguir también'
    },
    {
      usuario: 'Sofía',
      mensaje: 'Sofía empezó a seguirte.',
      fecha: 'Miércoles',
      imagen: 'https://picsum.photos/500/300?random=10',
      accion: true,
      accionTexto: 'Seguir también'
    },
    {
      usuario: 'Álex',
      mensaje: 'Álex y 18 personas más le dieron "me gusta" a tu publicación.',
      fecha: 'Hace 5 días',
      imagen: 'https://picsum.photos/500/300?random=1',
      accion: false
    }
  ];

  realizarAccion(accion: string) {
    console.log('Acción realizada:', accion);
  }
}
