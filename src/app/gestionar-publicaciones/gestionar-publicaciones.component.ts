import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { NavbarComponent } from "../navbar/navbar.component";
import { PiePaginaComponent } from "../pie-pagina/pie-pagina.component";
import { addIcons } from "ionicons";
import { cameraOutline, locationOutline, star, starOutline, bookOutline, ellipsisVertical } from "ionicons/icons";
import { PublicacionService } from '../services/publicacion.service';
import { Publicacion } from '../modelos/Publicacion';
import { CommonModule } from "@angular/common";
import {PerfilComponent} from "../perfil/perfil.component";

@Component({
  selector: 'app-gestionar-publicaciones',
  templateUrl: './gestionar-publicaciones.component.html',
  styleUrls: ['./gestionar-publicaciones.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    PiePaginaComponent,
    CommonModule,
    PerfilComponent
  ]
})
export class GestionarPublicacionesComponent implements OnInit {
  publicacion: Publicacion | null = null;
  publicaciones: Publicacion[] = [];

  constructor(private publicacionService: PublicacionService) {
    addIcons({ cameraOutline, star, starOutline, locationOutline, bookOutline, ellipsisVertical });
  }

  ngOnInit() {
    const idPub = 1; // Replace with the ID of the publication you want to get
    this.publicacionService.obtenerPublicacionPorId(idPub).subscribe(
      (data: Publicacion) => {
        this.publicacion = data;
      },
      (error) => {
        console.error('Error getting the publication:', error);
      }
    );
  }

  onProfileClick(publicacion: Publicacion) {
    console.log('Publication registered:', publicacion);
    // Add your registration logic here
  }
}
