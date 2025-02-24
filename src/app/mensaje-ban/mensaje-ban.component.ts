import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-mensaje-ban',
  templateUrl: './mensaje-ban.component.html',
  styleUrls: ['./mensaje-ban.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class MensajeBanComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
