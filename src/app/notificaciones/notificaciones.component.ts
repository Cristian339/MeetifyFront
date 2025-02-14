import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class NotificacionesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
