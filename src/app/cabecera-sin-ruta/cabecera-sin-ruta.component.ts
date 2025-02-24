import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-cabecera-sin-ruta',
    templateUrl: './cabecera-sin-ruta.component.html',
    styleUrls: ['./cabecera-sin-ruta.component.scss'],
    imports: [
        IonicModule
    ]
})
export class CabeceraSinRutaComponent  implements OnInit {
  @Input() titulo: string = 'NAVBAR';

  constructor() { }

  ngOnInit() {}

}
