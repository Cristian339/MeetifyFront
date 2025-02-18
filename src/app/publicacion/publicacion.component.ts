import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular/standalone';
import { ModalService } from '../services/modal.service';
import { PublicacionService } from '../services/publicacion.service';
import { Publicacion } from '../modelos/Publicacion';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import {IonicModule, ToastController} from '@ionic/angular';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import {addIcons} from "ionicons";
import {
  calendarOutline,
  ellipsisVerticalOutline, golfOutline,
  peopleCircleOutline, personCircleOutline,
  ribbonOutline,
  settingsOutline,
  shareSocialOutline
} from "ionicons/icons";
import {PerfilService} from "../services/perfil.service";
import {Categoria} from "../modelos/Categoria";
import {getTokenAtPosition} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";
import {Router} from "@angular/router";
import { ToastService} from "../services/toast.service";

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
  imports: [
    PiePaginaComponent,
    IonicModule,
    NavbarComponent,
    DatePipe,
    FormsModule,
    NgIf,
    NgForOf,
  ],
})
export class PublicacionComponent implements OnInit {
  isWebFormat: boolean = false;
  modalAbierto: boolean = false;
  mensajeModal: string = 'Crear una nueva publicación';
  presentingElement!: HTMLElement | null;
  currentDatePicker: 'start' | 'end' | null = null;
  isLink: boolean = false;
  publicacionNueva: Publicacion = new Publicacion();
  categorias: Categoria[] = []; // Hardcoded categories

  constructor(
    private toast: ToastService,
    private modalService: ModalService,
    private publicacionService: PublicacionService,
    private actionSheetCtrl: ActionSheetController,
    private perfilService: PerfilService,
    private router: Router
  ) {
  addIcons({ ellipsisVerticalOutline, ribbonOutline, shareSocialOutline, peopleCircleOutline,
    personCircleOutline, golfOutline, calendarOutline});
}

  publicaciones: Publicacion[] = [];

  ngOnInit() {

    this.presentingElement = document.querySelector('.ion-page');
    this.modalService.getModalStatus().subscribe((status) => {
      this.modalAbierto = status;
      console.log('Modal status:', status);
    });
    this.cargarPublicaciones();
    this.isWebFormat = this.checkIfWebFormat();
  }

  checkIfWebFormat(): boolean {
    return window.innerWidth > 600;
  }

  abrirModal() {
    this.modalAbierto = true;
    console.log('Modal abierto');
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


  cerrarModal() {
    this.modalService.cerrarModal();
    this.modalAbierto = false;
    console.log('Modal cerrado');
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Estás seguro de que quieres cerrar?',
      buttons: [
        {
          text: 'Sí',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  cargarPublicaciones(): void {
    this.publicaciones = [];
    this.publicacionService.getPublicaciones().subscribe({
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

  cargarCategorias(): void{
    this.categorias = [];
    this.perfilService.categoriasPerfil().subscribe(({
      next: (data) => {
        this.categorias = data;
        console.info(data);
      },
      error: (error) => console.error('Error:', error),
      complete: () => {
        console.log('Petición completada');
      },
    }))
  }

  cargarPublicacionesSeguidos(): void {
    this.publicaciones = [];
    this.publicacionService.getPublicacionesSeguidos().subscribe({
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

  guardarEvento() {
    this.publicacionService.guardarPublicacion(this.publicacionNueva).subscribe({
      next: (data) => {
        console.info(data);
        this.cargarPublicaciones();
      },
      error: (error) => console.error('Error:', error),
      complete: () => {
        console.log('Petición completada');
        this.modalAbierto = false; // Directly set modalAbierto to false
        this.modalService.cerrarModal(); // Close the modal without confirmation
        console.log('Modal should be closed');
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
