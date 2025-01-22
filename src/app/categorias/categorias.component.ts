import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
  ]
})
export class CategoriasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
