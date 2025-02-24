import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { arrowForwardOutline} from "ionicons/icons";
import {addIcons} from "ionicons";

@Component({
  selector: 'app-bienvenidos',
  templateUrl: './bienvenidos.component.html',
  styleUrls: ['./bienvenidos.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class BienvenidosComponent  implements OnInit {

  constructor() {
    addIcons( { arrowForwardOutline } );
  }

  ngOnInit() {}

}
