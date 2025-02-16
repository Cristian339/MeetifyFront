import { Component, OnInit, Input } from '@angular/core';
import { arrowBackCircle } from "ionicons/icons";
import { addIcons } from "ionicons";
import { IonicModule } from "@ionic/angular";
import {Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class CabeceraComponent implements OnInit {
  @Input() titulo: string = 'NAVBAR';
  @Input() ruta: string | undefined;


  constructor(private router: Router, private location : Location) {
    addIcons({ arrowBackCircle });
  }
  volver() {
    this.location.back();
  }

  ngOnInit() {}
}
