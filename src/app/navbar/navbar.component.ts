import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {arrowBackCircle } from "ionicons/icons";
import {addIcons} from "ionicons";

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

    addIcons( { arrowBackCircle } );
  }

  ngOnInit() {}

}
