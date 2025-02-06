import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular/standalone';
import { ModalService } from '../services/modal.service';
import { PublicacionService } from '../services/publicacion.service';
import { Publicacion } from '../modelos/Publicacion';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from '../navbar/navbar.component';
import { IonDatetime } from '@ionic/angular/standalone';
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
  modalAbierto: boolean = false;
  mensajeModal: string = 'Crear una nueva publicación';
  presentingElement!: HTMLElement | null;
  currentDatePicker: 'start' | 'end' | null = null;
  isLink: boolean = false;
  publicacionNueva: Publicacion = new Publicacion();
  categorias: Categoria[] = []; // Hardcoded categories

  constructor(
    private modalService: ModalService,
    private publicacionService: PublicacionService,
    private actionSheetCtrl: ActionSheetController,
    private perfilService: PerfilService
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
  }

  abrirModal() {
    this.modalAbierto = true;
    console.log('Modal abierto');
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
      next: (response) => {
        console.log('Publicación compartida exitosamente', response);
      },
      error: (error) => {
        console.error('Error al compartir publicación', error);
      },
      complete: () => {
        console.log('Petición completada');
      },
    });
  }

}
