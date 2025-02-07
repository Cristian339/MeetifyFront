import { Component, OnInit, ViewChild } from '@angular/core';
import {IonicModule, IonMenu, ModalController} from "@ionic/angular";
import { PiePaginaComponent } from "../pie-pagina/pie-pagina.component";
import { addIcons } from "ionicons";
import { cameraOutline, locationOutline, star, starOutline, bookOutline, ellipsisVertical, menuOutline, searchOutline } from "ionicons/icons";
import { PublicacionService } from '../services/publicacion.service';
import { Publicacion } from '../modelos/Publicacion';
import { CommonModule } from "@angular/common";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-gestionar-publicaciones',
  templateUrl: './gestionar-publicaciones.component.html',
  styleUrls: ['./gestionar-publicaciones.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PiePaginaComponent,
    CommonModule,
    FormsModule,
  ]
})

export class GestionarPublicacionesComponent implements OnInit {

  publicacionNew: any = {
    categoria: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    inicio: '',
    fin: '',
    enlaceImagen: ''
  };

  publicacion!: Publicacion;
  usuarioUnido: boolean = false;
  publicacionNueva: any = {};
  categorias: string[] = ['Naturaleza', 'Viajes', 'Gastronomía', 'Arte', 'Tecnología'];
  isLink: boolean = false;
  presentingElement: any;
  mostrarBotonSalir: boolean = false;

  constructor(
    private modalController: ModalController,
    private publicacionService: PublicacionService,
    private router : Router) {
    addIcons({ cameraOutline, star, starOutline, locationOutline, bookOutline, ellipsisVertical, menuOutline, searchOutline });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const id = navigation.extras.state['id'];
      if (id) {
        this.cargarPublicacion(id);
        console.log('ID de la publicación cargada:', id);
      } else {
        this.publicacion = navigation.extras.state['publicacion'];
        console.log('Publicación cargada:', this.publicacion);
      }
    }
  }

  salirPublicacion(publicacion: Publicacion) {
    if (publicacion.id !== undefined) {
      this.publicacionService.salirPublicacion(publicacion.id).subscribe(() => {
        console.log('Salido de la publicación con éxito');
        this.router.navigate(['/gestionar-publicaciones']);
      }, (error) => {
        console.error('Error al salir de la publicación:', error);
      });
    } else {
      console.error('El id de la publicación no está definido');
    }
  }

  unirUsuario() {
    this.usuarioUnido = true;
  }

  guardarEvento() {
    if (this.publicacionNueva) {
      this.publicacionService.guardarPublicacion(this.publicacionNueva).subscribe(
        response => {
          console.log('Evento guardado:', response);
          this.cerrarEditModal();
        },
        error => {
          console.error('Error al guardar el evento:', error);
        }
      );
    } else {
      console.error('No hay datos de la publicación nueva');
    }
  }

  @ViewChild(IonMenu) menu!: IonMenu;

  closeMenu() {
    this.menu.close();
  }

  cerrarEditModal() {
    this.modalController.dismiss();
  }

  cerrarDeleteModal() {
    this.modalController.dismiss();
  }

  actualizarPublicacion() {
    if (this.publicacionNew && this.publicacionNew.id !== undefined) {
      this.publicacionService.actualizarPublicacion(this.publicacionNew.id, this.publicacionNew).subscribe(
        response => {
          console.log('Publicación actualizada:', response);
          this.cerrarEditModal();
        },
        error => {
          console.error('Error al actualizar la publicación:', error);
        }
      );
    } else {
      console.error('No hay datos de la publicación para actualizar o el id no está definido');
    }
  }

  eliminarPublicacion() {
    if (this.publicacion && this.publicacion.id !== undefined) {
      this.publicacionService.eliminarPublicacion(this.publicacion.id).subscribe(
        () => {
          console.log('Publicación eliminada');
          this.cerrarDeleteModal();
          this.router.navigate(['/perfil']);
        },
        error => {
          console.error('Error al eliminar la publicación:', error);
        }
      );
    } else {
      console.error('No hay datos de la publicación para eliminar o el id no está definido');
    }
  }

  cargarPublicacion(idPub: number) {
    this.publicacionService.obtenerPublicacionPorId(idPub).subscribe(
      (data: Publicacion) => {
        this.publicacion = data;
        console.log('Publicación cargada:', this.publicacion);
      },
      error => {
        console.error('Error al cargar la publicación:', error);
      }
    );
  }
}
