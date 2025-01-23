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
import {Router} from "@angular/router";

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

  constructor(private router: Router) {
    addIcons({chatbubbleEllipsesOutline,homeOutline,notificationsOutline,personOutline,addCircleOutline});
  }

  ngOnInit() {}

  entrarChat() {
      this.router.navigate(['/mensajeria']);
  }

  entrarHome() {
    this.router.navigate(['/publicacion']);
  }
  editarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

}
