import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from '../navbar/navbar.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  ellipsisVerticalOutline, eye,
  golfOutline,
  peopleCircleOutline,
  personCircleOutline,
  ribbonOutline,
  shareSocialOutline
} from 'ionicons/icons';
import { ModalService } from '../services/modal.service';
import {Publicacion} from "../modelos/Publicacion";
import {PublicacionService} from "../services/publicacion.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    PiePaginaComponent,
    NgForOf,
  ]
})
export class PublicacionComponent implements OnInit {
  modalAbierto: boolean = false;
  mensajeModal: string = 'Crear una nueva publicación';

  constructor(private modalService: ModalService, private publicacionService: PublicacionService) {
    addIcons({ eye,personCircleOutline, ribbonOutline, peopleCircleOutline, shareSocialOutline, ellipsisVerticalOutline, calendarOutline, golfOutline });
  }


  publicaciones: Publicacion[] = [];
  ngOnInit() {
    this.modalAbierto = this.modalService.isModalAbierto();
    this.cargarPublicaciones();
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.modalAbierto = this.modalService.isModalAbierto();
  }

  cargarPublicaciones(): void {
    this.publicaciones = [];
    this.publicacionService.getPublicaciones().subscribe({
      next: (data) => {
        this.publicaciones = data;
        console.info(data)
      },
      error: (error) => console.error('Error:', error),
      complete: () => {
        console.log('Petición completada');
      }
    });
  }

  cargarPublicacionesSeguidos(): void {
    this.publicaciones = [];
    this.publicacionService.getPublicacionesSeguidos().subscribe({
      next: (data) => {
        this.publicaciones = data;
        console.info(data)
      },
      error: (error) => console.error('Error:', error),
      complete: () => {
        console.log('Petición completada');
      }
    });
  }
}
