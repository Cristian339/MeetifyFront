import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {Perfil} from "../modelos/Perfil";
import {Categoria} from "../modelos/Categoria";
import {SeguidorDTO} from "../modelos/SeguidorDTO";
import {Publicacion} from "../modelos/Publicacion";
import {PerfilService} from "../services/perfil.service";
import {PublicacionService} from "../services/publicacion.service";
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import { ActivatedRoute } from '@angular/router';
import {
  arrowBackOutline,
  constructOutline,
  personOutline,
  settingsOutline,
  starOutline,
  trophyOutline
} from "ionicons/icons";
import {TipoRelacion} from "../modelos/TipoRelacion";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-perfil-ajeno',
    templateUrl: './perfil-ajeno.component.html',
    styleUrls: ['./perfil-ajeno.component.scss'],
    standalone: true,
    imports: [
      IonicModule,
      NgForOf,
      NgIf,
      FormsModule
    ]
})
export class PerfilAjenoComponent  implements OnInit {

  botonS : boolean = true;
  perfil: Perfil | undefined;
  categorias: Categoria[] = [];
  seguidores: SeguidorDTO[] = [];
  seguidos: SeguidorDTO[] = [];
  filteredSeguidores: SeguidorDTO[] = [];
  filteredSeguidos: SeguidorDTO[] = [];
  seguidoresCount: number = 0;
  seguidosCount: number = 0;
  publicacionesCount: number = 0;
  searchTerm: string = '';
  searchTermSeguidores: string = '';
  deshabilitarBoton: boolean = false;
  idPerfil:number | undefined = 0;

  // vaciarDatos(){
  //   this.publicaciones = [];
  //   this.categorias = [];
  //   this.seguidores = [];
  //   this.seguidos = [];
  //   this.filteredSeguidores = [];
  //   this.filteredSeguidos = [];
  //   this.seguidosCount = 0;
  //   this.seguidoresCount = 0;
  //   this.searchTerm = '';
  //   this.searchTermSeguidores = '';
  //   console.log("vaciao")
  // }

  @Input() publicaciones: Publicacion[] | undefined;
  @Output() profileClick = new EventEmitter<Publicacion>();

  constructor(
    private perfilService: PerfilService,
    private publicacionService: PublicacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ settingsOutline, arrowBackOutline, constructOutline, starOutline, trophyOutline, personOutline });
  }



  ngOnInit() {
    this.publicaciones = [];
    this.categorias = [];
    this.seguidores = [];
    this.seguidos = [];
    this.filteredSeguidores = [];
    this.filteredSeguidos = [];
    this.seguidosCount = 0;
    this.seguidoresCount = 0;
    this.searchTerm = '';
    this.searchTermSeguidores = '';
    this.idPerfil= 0;

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log('ID recibido:', id);
          //En caso que sea desde lista de eventos
          this.publicacionService.otroUsuario(id).subscribe({
            next: (data) => {
              console.log('Data received:', data);
              this.perfil = data;
              console.log('Perfil assigned:', this.perfil);
            },
            error: (error) => console.error('Error:', error),
            complete: () => console.log('Request completed')
          });
          //En caso que sea desde lista de perfiles
          this.perfilService.getPerfilPorId(id).subscribe({
            next: (data) => {
              console.log('Data received:', data);
              this.perfil = data;
              console.log('Perfil assigned:', this.perfil);
            },
            error: (error) => console.error('Error:', error),
            complete: () => console.log('Request completed')
          });
          this.perfilService.categoriasOtroPerfil(id).subscribe({
            next: (data) => {
              console.log('Data received:', data);
              this.categorias = data;
              console.log('Perfil assigned:', this.perfil);
            },
            error: (error) => console.error('Error:', error),
            complete: () => console.log('Request completed')
          });
          this.idPerfil = id;
    });
    this.cargarSeguidores();
    this.cargarPublicaciones()
    this.cargarSeguidos();
    this.cargarSeguidores5();
    this.cargarSeguidos5();
    this.comprobar();
  }

  verPubli(publicacion: Publicacion) {
    this.publicacionService.obtenerCreador(publicacion.id).subscribe(esCreador => {
      console.log(esCreador)
      if (esCreador) {
        this.router.navigate(['/gestionar-publicaciones'], { state: { publicacion } });
      } else if (!esCreador){
        this.router.navigate(['/unirse-evento'], { state: { publicacion } });
      }
    }, error => {
      console.error("Error al verificar el creador de la publicación", error);
    });
  }

  cargarSeguidores5() {
    this.perfilService.obtenerSeguidoresOtro(this.idPerfil).subscribe((seguidores: SeguidorDTO[]) => {
      this.seguidores = seguidores;
      this.seguidoresCount = seguidores.length;
    });
  }

  cargarSeguidos5() {
    this.perfilService.obtenerSeguidosOtro(this.idPerfil).subscribe((seguidos: SeguidorDTO[]) => {
      this.seguidos = seguidos;
      this.seguidosCount = seguidos.length;
    });
  }

  cargarPublicaciones(): void {
    this.publicaciones = [];
    this.publicacionService.getPublicacionesOtro(this.idPerfil).subscribe({
      next: (data) => {
        console.log('Publicaciones received:', data);
        this.publicaciones = data;
        this.publicacionesCount = data.length;
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Request completed')
    });
  }

  cargarSeguidores() {
    this.perfilService.obtenerSeguidoresOtro(this.idPerfil).subscribe((seguidores: SeguidorDTO[]) => {
      this.seguidores = seguidores.map(seguidor => ({
        ...seguidor,
        tipoRelacion: this.getTipoRelacion(seguidor),
        buttonDisabled: false
      }));
      this.filteredSeguidores = this.seguidores;
      this.seguidoresCount = seguidores.length;
    });
  }

  cargarSeguidos() {
    this.perfilService.obtenerSeguidosOtro(this.idPerfil).subscribe((seguidos: SeguidorDTO[]) => {
      this.seguidos = seguidos.map(seguido => ({
        ...seguido,
        tipoRelacion: this.getTipoRelacion(seguido),
        buttonDisabled: false
      }));
      this.filteredSeguidos = this.seguidos;
      this.seguidosCount = seguidos.length;
    });
  }

  filterSeguidores() {
    this.filteredSeguidores = this.seguidores.filter(seg =>
      seg.nombre?.toLowerCase().includes(this.searchTermSeguidores.toLowerCase())
    );
  }

  filterSeguidos() {
    this.filteredSeguidos = this.seguidos.filter(seg =>
      seg.nombre?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  cargarPublicacionesCompartidas(): void {
    this.publicaciones = [];
    this.perfilService.obtenerPublicacionesCompartidasOtro(this.idPerfil).subscribe({
      next: (data) => {
        console.log('Publicaciones received:', data);
        this.publicaciones = data;
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Request completed')
    });
  }

  getTipoRelacion(usuario: SeguidorDTO): TipoRelacion {
    const esSeguidor = this.seguidores.some(seguidor => seguidor.id === usuario.id);
    const esSeguido = this.seguidos.some(seguido => seguido.id === usuario.id);

    if (esSeguidor && esSeguido) {
      return TipoRelacion.AMIGO;
    } else if (esSeguidor) {
      return TipoRelacion.SEGUIDOR;
    } else if (esSeguido) {
      return TipoRelacion.SEGUIDO;
    } else {
      return TipoRelacion.SEGUIDOR;
    }
  }

  dejarDeSeguir(idPerfil: number | undefined): void {
    this.perfilService.dejarUsuario(this.idPerfil).subscribe({
      next: () => {
        console.log(`Dejaste de seguir al usuario con ID: ${this.idPerfil}`);
        const seguido = this.filteredSeguidos.find(s => s.id === this.idPerfil);
        if (seguido) {
          const seguidor = this.filteredSeguidores.find(s => s.id === this.idPerfil);
          if (seguidor) {
            seguidor.buttonDisabled = false;
          }
        }
        this.cargarSeguidos();
      },
      error: (error) => console.error('Error al dejar de seguir:', error)
    });
  }

  seguirUsuario(idPerfil: number | undefined): void {
    this.perfilService.seguirUsuario(this.idPerfil).subscribe({
      next: () => {
        console.log(`Ahora sigues al usuario con ID: ${this.idPerfil}`);
        this.cargarSeguidos();
      },
      error: (error) => {
        console.error('Error al seguir al usuario:', error);
      }
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

  setBoton(){
    if (this.botonS){
      this.botonS = false;
      this.dejarDeSeguir(this.idPerfil);
    }else {
      this.botonS = true;
      this.seguirUsuario(this.idPerfil);
    }
  }


  comprobar(){
    this.perfilService.comprobarSiSiguesUsuario(this.idPerfil).subscribe({
      next:(data) => {
        this.botonS = data;
      },
      error:() => {
        console.log("No se pudo comprobar si le sigues o no")
      }
    })
  }

}
