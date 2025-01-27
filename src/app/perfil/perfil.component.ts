import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {arrowBackOutline, constructOutline, settingsOutline, starOutline, trophyOutline} from "ionicons/icons";

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class PerfilComponent  implements OnInit {

  constructor() {
    addIcons({ settingsOutline, arrowBackOutline,constructOutline,starOutline,trophyOutline });
  }

  ngOnInit() {}

}
