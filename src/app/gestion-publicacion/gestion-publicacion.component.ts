import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import { addIcons} from "ionicons";
import { heartOutline, chatbubbleOutline, shareOutline, arrowBack, ellipsisVertical, search, menu } from 'ionicons/icons';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-gestion-publicacion',
  templateUrl: './gestion-publicacion.component.html',
  styleUrls: ['./gestion-publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class GestionPublicacionComponent  implements OnInit {

  post: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.post = navigation?.extras?.state?.['post'];

    addIcons({ arrowBack, heartOutline, chatbubbleOutline, shareOutline, ellipsisVertical, search, menu });
  }

  ngOnInit() {}

}
