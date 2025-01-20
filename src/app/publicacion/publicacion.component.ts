import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarComponent} from "../navbar/navbar.component";
import {PiePaginaComponent} from "../pie-pagina/pie-pagina.component";

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    PiePaginaComponent
  ]
})
export class PublicacionComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
