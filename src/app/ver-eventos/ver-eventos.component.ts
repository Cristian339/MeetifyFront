import { Component, OnInit } from '@angular/core';
import {CabeceraComponent} from "../cabecera/cabecera.component";
import {IonicModule, ToastController} from "@ionic/angular";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
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
import {Publicacion} from "../modelos/Publicacion";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-ver-eventos',
    templateUrl: './ver-eventos.component.html',
    styleUrls: ['./ver-eventos.component.scss'],
    standalone: true,
  imports: [
    CabeceraComponent,
    IonicModule,
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule
  ]
})
export class VerEventosComponent  implements OnInit {

  publicaciones: Publicacion[] = [];
  publicacionesFiltradas: Publicacion[] = [];
  busqueda: string = '';


  constructor(
    private publicacionService: PublicacionService,
    private perfilService: PerfilService,
    private toastController: ToastController,
    private router: Router
  ) {
    addIcons({
      ellipsisVerticalOutline, ribbonOutline, shareSocialOutline, peopleCircleOutline,
      personCircleOutline, golfOutline, calendarOutline
    });
  }



  ngOnInit(){
    this.cargarPublicaciones();
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
    this.router.navigate(['/puntuar'], { state: { publicacion } });
  }


  cargarPublicaciones(): void {
    this.publicacionService.getTodasLasPublicaciones().subscribe({
      next: (data) => {
        this.publicaciones = data;
        this.publicacionesFiltradas = data; // Inicializar filtrado
      },
      error: (error) => console.error('Error:', error),
    });
  }


  filtrarPublicaciones() {
    const filtro = this.busqueda.toLowerCase();
    this.publicacionesFiltradas = this.publicaciones.filter(publicacion =>
      publicacion.titulo?.toLowerCase().includes(filtro) ||
      publicacion.descripcion?.toLowerCase().includes(filtro) ||
      publicacion.ubicacion?.toLowerCase().includes(filtro)
    );
  }


  compartirPublicacion(publicacionId: number | undefined): void {
    // Llamamos al servicio para compartir la publicación
    console.log(publicacionId);
    this.perfilService.compartirPublicacion(publicacionId).subscribe({
      next: async (response) => {
        console.log('Publicación compartida exitosamente', response);

        // Mostrar el toast después de la respuesta exitosa
        const toast = await this.toastController.create({
          message: '¡Publicación compartida exitosamente!',
          duration: 2000, // Duración del toast en milisegundos
          position: 'bottom' // Posición del toast
        });
        toast.present();
      },
      error: (error) => {
        console.error('Error al compartir publicación', error);

        // Mostrar el toast en caso de error
        this.toastController.create({
          message: 'Hubo un error al compartir la publicación.',
          duration: 2000,
          position: 'bottom'
        }).then(toast => toast.present());
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
