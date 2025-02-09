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
import {UsuarioDTO} from "../modelos/UsuarioDTO";

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

  seguidores: UsuarioDTO[] = [];
  numeroSeguidores: number = 0;
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
  eliminarPubDTO: any = {};
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
        this.cargarSeguidores5(id);
        console.log('ID de la publicación cargada:', id);
      } else {
        this.publicacion = navigation.extras.state['publicacion'];
        console.log('Publicación cargada:', this.publicacion);
        if (this.publicacion && this.publicacion.id) {
          this.cargarSeguidores5(this.publicacion.id);
        }
      }
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
    if (!this.publicacion?.id) {
      console.error('Error: No hay datos de la publicación para eliminar o el ID no está definido');
      return;
    }


    this.publicacionService.eliminarPublicacion(this.publicacion.id).subscribe({
      next: () => {
        console.log('Publicación eliminada');
        this.cerrarDeleteModal();
        this.router.navigate(['/perfil']);
      },
      error: (error: any) => {
        console.error('Error al eliminar la publicación:', error);
        alert('No se pudo eliminar la publicación. ' + (error?.error || 'Inténtalo nuevamente.'));
      }
    });
  }


  cargarPublicacion(id: number) {
    this.publicacionService.obtenerPublicacionPorId(id).subscribe({
      next: (data: Publicacion) => {
        this.publicacion = data;
        console.log('Publicación cargada:', this.publicacion);
      },
      error: (error: any) => {
        console.error('Error al cargar la publicación:', error);
        alert('No se pudo cargar la publicación. ' + (error?.error || 'Inténtalo nuevamente.'));
      }
    });
  }

  cargarSeguidores5(idPublicacion: number) {
    this.publicacionService.obtenerUsuariosUnidos(idPublicacion).subscribe((seguidores: UsuarioDTO[]) => {
      this.seguidores = seguidores;
      this.numeroSeguidores = seguidores.length;
    });
  }
}
