import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
    ]
})
export class CategoriasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
