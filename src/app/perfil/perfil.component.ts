import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { arrowBackOutline, constructOutline, settingsOutline, starOutline, trophyOutline, personOutline } from "ionicons/icons";
import { NgForOf, NgIf } from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { PublicacionService } from '../services/publicacion.service';
import { Perfil } from '../modelos/Perfil';
import { Publicacion } from '../modelos/Publicacion';
import {Categoria} from "../modelos/Categoria";
import {SeguidorDTO} from "../modelos/SeguidorDTO";
import {FormsModule} from "@angular/forms";
import { TipoRelacion } from '../modelos/TipoRelacion';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    NgIf,
    FormsModule
  ]
})
export class PerfilComponent implements OnInit {


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

  @Input() publicaciones: Publicacion[] | undefined;
  @Output() profileClick = new EventEmitter<Publicacion>();

  constructor(
    private perfilService: PerfilService,
    private publicacionService: PublicacionService,
    private router: Router
  ) {
    addIcons({ settingsOutline, arrowBackOutline, constructOutline, starOutline, trophyOutline, personOutline });
  }



  ngOnInit() {
    console.log('ngOnInit called');
    this.perfilService.getPerfil().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.perfil = data;
        console.log('Perfil assigned:', this.perfil);
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Request completed')
    });
    this.perfilService.categoriasPerfil().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.categorias = data;
        console.log('Perfil assigned:', this.perfil);
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Request completed')
    });
    this.cargarSeguidores();
    this.cargarPublicaciones()
    this.cargarSeguidos();
    this.cargarSeguidores5();
    this.cargarSeguidos5();
  }

  verPubli(publicacion: Publicacion) {
    this.router.navigate(['/gestionar-publicaciones'], { state: { publicacion } });
  }

  cargarSeguidores5() {
    this.perfilService.obtenerSeguidores().subscribe((seguidores: SeguidorDTO[]) => {
      this.seguidores = seguidores;
      this.seguidoresCount = seguidores.length;
    });
  }

  cargarSeguidos5() {
    this.perfilService.obtenerSeguidos().subscribe((seguidos: SeguidorDTO[]) => {
      this.seguidos = seguidos;
      this.seguidosCount = seguidos.length;
    });
  }

  cargarPublicaciones(): void {
    this.publicaciones = [];
    this.publicacionService.getMisPublicaciones().subscribe({
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
    this.perfilService.obtenerSeguidores().subscribe((seguidores: SeguidorDTO[]) => {
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
    this.perfilService.obtenerSeguidos().subscribe((seguidos: SeguidorDTO[]) => {
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
    this.perfilService.obtenerPublicacionesCompartidas().subscribe({
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

  dejarDeSeguir(idUsuarioADejarDeSeguir: number): void {
    this.perfilService.dejarUsuario(idUsuarioADejarDeSeguir).subscribe({
      next: () => {
        console.log(`Dejaste de seguir al usuario con ID: ${idUsuarioADejarDeSeguir}`);
        const seguido = this.filteredSeguidos.find(s => s.id === idUsuarioADejarDeSeguir);
        if (seguido) {
          const seguidor = this.filteredSeguidores.find(s => s.id === idUsuarioADejarDeSeguir);
          if (seguidor) {
            seguidor.buttonDisabled = false;
          }
        }
        this.cargarSeguidos();
      },
      error: (error) => console.error('Error al dejar de seguir:', error)
    });
  }

  seguirUsuario(seguidor: any): void {
    seguidor.buttonDisabled = true;
    this.perfilService.seguirUsuario(seguidor.id).subscribe({
      next: () => {
        console.log(`Ahora sigues al usuario con ID: ${seguidor.id}`);
        seguidor.seguido = true;
        this.cargarSeguidos();
      },
      error: (error) => {
        console.error('Error al seguir al usuario:', error);
        seguidor.buttonDisabled = false;
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

}
