import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {
  addCircleOutline,
  chatbubbleEllipsesOutline,
  homeOutline,
  notificationsOutline,
  personOutline
} from "ionicons/icons";
import {IonCol, IonFooter, IonGrid, IonIcon, IonRow, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-pie-pagina',
  templateUrl: './pie-pagina.component.html',
  styleUrls: ['./pie-pagina.component.scss'],
  standalone: true,
  imports: [
    IonicModule

  ]
})
export class PiePaginaComponent  implements OnInit {

  constructor() {
    addIcons({chatbubbleEllipsesOutline,homeOutline,notificationsOutline,personOutline,addCircleOutline});
  }

  ngOnInit() {}

}
