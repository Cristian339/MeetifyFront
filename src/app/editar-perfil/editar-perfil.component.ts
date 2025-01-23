import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,

  ]
})
export class EditarPerfilComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
