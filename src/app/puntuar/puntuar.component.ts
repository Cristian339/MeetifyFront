import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import{ addIcons} from "ionicons";
import { arrowBackCircle} from "ionicons/icons";
import {FormsModule} from "@angular/forms";
import {Publicacion} from "../modelos/Publicacion";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-puntuar',
  templateUrl: './puntuar.component.html',
  styleUrls: ['./puntuar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterLink
  ]
})
export class PuntuarComponent  implements OnInit {
  publicacion!: Publicacion;

  constructor(
    private router: Router
  ) {
    addIcons({arrowBackCircle});
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.publicacion = navigation.extras.state['publicacion'];
      console.log('Publicación cargada:', this.publicacion);
    }
  }
}
