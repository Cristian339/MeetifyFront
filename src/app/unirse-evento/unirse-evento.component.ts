import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { arrowBackCircle, personCircleOutline, locationOutline } from "ionicons/icons";
import { Publicacion } from "../modelos/Publicacion";
import { PublicacionService } from "../services/publicacion.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CommonModule, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-unirse-evento',
  templateUrl: './unirse-evento.component.html',
  styleUrls: ['./unirse-evento.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterLink,
    CommonModule,
    FormsModule,
  ]
})
export class UnirseEventoComponent implements OnInit {

  publicacion: Publicacion | undefined;

  constructor(
    private publicacionService: PublicacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({ arrowBackCircle, personCircleOutline, locationOutline });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.publicacion = navigation.extras.state['publicacion'];
      console.log('Publicación cargada:', this.publicacion);
    }
  }

  unirseEvento() {
    if (this.publicacion?.id) {
      this.publicacionService.unirsePublicacion(this.publicacion.id).subscribe(() => {
        console.log('Unido a la publicación con éxito');
        this.router.navigate(['/gestionar-publicaciones'], { state: { publicacion: this.publicacion, desdeUnirse: true } });
      }, (error: HttpErrorResponse) => {
        console.error('Error al unirse a la publicación:', error);
        if (error.status === 500) {
          alert('Ocurrió un error en el servidor. Por favor, inténtelo de nuevo más tarde.');
        } else {
          alert(`Error: ${error.message}`);
        }
      });
    }
  }
}
