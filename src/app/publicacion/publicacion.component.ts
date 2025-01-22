import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NavbarComponent} from "../navbar/navbar.component";
import {PiePaginaComponent} from "../pie-pagina/pie-pagina.component";
import {addIcons} from "ionicons";
import {
  calendarOutline,
  ellipsisVerticalOutline, golfOutline,
  peopleCircleOutline,
  personCircleOutline,
  ribbonOutline,
  shareSocialOutline
} from "ionicons/icons";
import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonSegmentButton
} from "@ionic/angular/standalone";

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

  constructor() {
    addIcons({personCircleOutline,ribbonOutline,peopleCircleOutline,shareSocialOutline,ellipsisVerticalOutline,calendarOutline,golfOutline});
  }

  ngOnInit() {}

}
