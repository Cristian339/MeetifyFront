import { Component, OnInit } from '@angular/core';
import {CabeceraComponent} from "../cabecera/cabecera.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {Publicacion} from "../modelos/Publicacion";
import {ToastService} from "../services/toast.service";
import {ModalService} from "../services/modal.service";
import {PublicacionService} from "../services/publicacion.service";
import {ActionSheetController} from "@ionic/angular/standalone";
import {PerfilService} from "../services/perfil.service";
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {
  calendarOutline,
  ellipsisVerticalOutline, golfOutline,
  peopleCircleOutline,
  personCircleOutline,
  ribbonOutline,
  shareSocialOutline
} from "ionicons/icons";

@Component({
    selector: 'app-eventos-unido',
    templateUrl: './eventos-unido.component.html',
    styleUrls: ['./eventos-unido.component.scss'],
    standalone: true,
    imports: [
        CabeceraComponent,
        DatePipe,
        IonicModule,
        NgForOf,
        NgIf
    ]
})
export class EventosUnidoComponent  implements OnInit {

  publicaciones: Publicacion[] = [];

  constructor(private toast: ToastService,
              private modalService: ModalService,
              private publicacionService: PublicacionService,
              private actionSheetCtrl: ActionSheetController,
              private perfilService: PerfilService,
              private router: Router) {
    addIcons({ ellipsisVerticalOutline, ribbonOutline, shareSocialOutline, peopleCircleOutline,
      personCircleOutline, golfOutline, calendarOutline});}

  ngOnInit() {
    this.cargarPublicaciones();
  }


  cargarPublicaciones(): void {
    this.publicaciones = [];
    this.perfilService.obtenerPublicacionesDentro().subscribe({
      next: (data) => {
        this.publicaciones = data;
        console.info(data);
      },
      error: (error) => console.error('Error:', error),
      complete: () => {
        console.log('Petición completada');
      },
    });
  }

  unirseEvento(publicacion: Publicacion) {
    this.publicacionService.obtenerCreador(publicacion.id).subscribe(esCreador => {
      if (esCreador) {
        this.router.navigate(['/gestionar-publicaciones'], { state: { publicacion } });
      } else {
        this.router.navigate(['/unirse-evento'], { state: { publicacion } });
      }
    }, error => {
      console.error("Error al verificar el creador de la publicación", error);
    });
  }


  puntuarEvento(publicacion: Publicacion) {
    this.publicacionService.dentroOFuera(publicacion.id).subscribe({
      next: (data) => {
        if (data) {
          this.router.navigate(['/puntuar'], { state: { publicacion } });
        } else if (!data) {
          this.toast.presentToast('Tienes que pertenecer al evento', 'warning');
        }
      },
      error: () => {
        console.log('No se pudo puntuar');
      },
    });
  }

  compartirPublicacion(publicacionId: number | undefined): void {
    // Llamamos al servicio para compartir la publicación
    console.log(publicacionId);
    this.perfilService.compartirPublicacion(publicacionId).subscribe({
      next: async (response) => {
        console.log('Publicación compartida exitosamente', response);

        // Mostrar el toast después de la respuesta exitosa
        this.toast.presentToast('¡Publicación compartida exitosamente!', 'success');
      },
      error: (error) => {
        console.error('Error al compartir publicación', error);

        // Mostrar el toast en caso de error
        this.toast.presentToast('Hubo un error al compartir la publicación.', 'error');
      },
      complete: () => {
        console.log('Petición completada');
      },
    });
  }



  entrarPerfil(id: number | undefined) {
    this.router.navigate(['/perfil-ajeno'], { queryParams: { id } });
  }

}
