import { Component, OnInit } from '@angular/core';
import {arrowBackCircle } from "ionicons/icons";
import {addIcons} from "ionicons";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
  standalone: true,
})
export class CabeceraComponent  implements OnInit {

  constructor() {
    addIcons( { arrowBackCircle } );

  }

  ngOnInit() {}

}
