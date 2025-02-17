import { Component, OnInit, ViewChild } from '@angular/core';
import {IonicModule, IonMenu, ModalController} from "@ionic/angular";
import { PiePaginaComponent } from "../pie-pagina/pie-pagina.component";
import { addIcons } from "ionicons";
import {
  cameraOutline,
  locationOutline,
  star,
  starOutline,
  bookOutline,
  ellipsisVertical,
  menuOutline,
  searchOutline,
  createOutline
} from "ionicons/icons";
import { PublicacionService } from '../services/publicacion.service';
import { Publicacion } from '../modelos/Publicacion';
import { CommonModule } from "@angular/common";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ModalService} from "../services/modal.service";
import {UsuarioDTO} from "../modelos/UsuarioDTO";
import {PerfilService} from "../services/perfil.service";
import {Categoria} from "../modelos/Categoria";
import {Resenias} from "../modelos/Resenias";
import {CabeceraComponent} from "../cabecera/cabecera.component";

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
        CabeceraComponent,
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

  puntuacion: number = 0;
  resenias: Resenias[] = [];
  publicacion!: Publicacion;
  eliminarPubDTO: any = {};
  usuarioUnido: boolean = false;
  publicacionNueva: any = {};
  categorias: Categoria[] = [];
  isLink: boolean = false;
  presentingElement: any;
  mostrarBotonSalir: boolean = false;

  modalOpciones = false;
  modalEditar= false;
  modalEliminar= false;

  constructor(
    private modalController: ModalController,
    private publicacionService: PublicacionService,
    private router : Router,
    private perfilService : PerfilService) {
    addIcons({ createOutline,cameraOutline, star, starOutline, locationOutline, bookOutline, ellipsisVertical, menuOutline, searchOutline });
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
    this.cargarCategorias();
  }






  abrirOpcionesModal() {
    this.modalOpciones = true;
  }

  abrirEditarModal() {
    this.modalEditar = true;
  }

  abrirEliminarModal() {
    this.modalEliminar = true;
  }

  cerrarOpcionesModal() {
    this.modalOpciones = false;
  }

  cerrarEditarModal() {
    this.modalEditar = false;
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

  cargarReneias(idPub: number | undefined){
    this.publicacionService.obtenerPuntuaciones(idPub).subscribe({
      next:(data)=> {
        console.log(data);
        this.resenias=data;
      },
      error:()=> {
        console.log("Error al cargar reseñas")
      }
    })
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

    this.publicacionService.actualizarPublicacion(this.publicacion.id, this.publicacion).subscribe({
      next: () => {
        console.log("Se actualizaron los datos");
        this.cerrarEditarModal();
      },
      error: () => {
        console.log("error modificando");
      }
    });

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
}
