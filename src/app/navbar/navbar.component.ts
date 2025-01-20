import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {menuOutline, searchOutline} from "ionicons/icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class NavbarComponent  implements OnInit {

  constructor() {
    addIcons({menuOutline,searchOutline})
  }

  ngOnInit() {}

}
