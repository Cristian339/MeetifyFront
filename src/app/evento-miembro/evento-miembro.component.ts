import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonMenu, ModalController} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {PiePaginaComponent} from "../pie-pagina/pie-pagina.component";
import {Publicacion} from "../modelos/Publicacion";
import {PublicacionService} from "../services/publicacion.service";
import {Router, RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {
  bookOutline,
  cameraOutline,
  ellipsisVertical,
  locationOutline,
  menuOutline, searchOutline,
  star,
  starOutline
} from "ionicons/icons";
import {SeguidorDTO} from "../modelos/SeguidorDTO";
import {UsuarioDTO} from "../modelos/UsuarioDTO";

@Component({
    selector: 'app-evento-miembro',
    templateUrl: './evento-miembro.component.html',
    styleUrls: ['./evento-miembro.component.scss'],
  standalone: true,
    imports: [
        IonicModule,
        NgIf,
        PiePaginaComponent,
        RouterLink
    ]
})
export class EventoMiembroComponent  implements OnInit {

  seguidores: UsuarioDTO[] = [];
  numeroSeguidores: number = 0;
  publicacion!: Publicacion;
  publicacionNew: any = {
    categoria: '',
    titulo: '',
    descripcion: '',
    ubicacion: '',
    inicio: '',
    fin: '',
    enlaceImagen: ''
  };
  categorias: string[] = ['Naturaleza', 'Viajes', 'Gastronomía', 'Arte', 'Tecnología'];
  mostrarBotonSalir: boolean = false;

  constructor(
    private modalController: ModalController,
    private publicacionService: PublicacionService,
    private router : Router) {
    addIcons({ cameraOutline, star, starOutline, locationOutline, bookOutline, ellipsisVertical, menuOutline, searchOutline });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.publicacion = navigation.extras.state['publicacion'];
      console.log('Publicación cargada:', this.publicacion);
      if (this.publicacion.id !== undefined) {
        this.cargarSeguidores5(this.publicacion.id);
      } else {
        console.error('El id de la publicación no está definido');
      }
    }
  }

  @ViewChild(IonMenu) menu!: IonMenu;

  closeMenu() {
    this.menu.close();
  }

  cargarSeguidores5(idPublicacion: number) {
    this.publicacionService.obtenerUsuariosUnidos(idPublicacion).subscribe((seguidores: UsuarioDTO[]) => {
      this.seguidores = seguidores;
      this.numeroSeguidores = seguidores.length;
    });
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

  salirPublicacion(publicacion: Publicacion) {
    if (publicacion.id !== undefined) {
      this.publicacionService.salirPublicacion(publicacion.id).subscribe(() => {
        console.log('Salido de la publicación con éxito');
        this.router.navigate(['/perfil'], { state: { publicacion: publicacion } });
      }, (error) => {
        console.error('Error al salir de la publicación:', error);
      });
    } else {
      console.error('El id de la publicación no está definido');
    }
  }

}
