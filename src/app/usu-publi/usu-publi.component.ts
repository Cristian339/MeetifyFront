import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicacionService } from '../services/publicacion.service';
import { Publicacion } from '../modelos/Publicacion';
import {IonicModule} from "@ionic/angular";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-usu-publi',
  templateUrl: './usu-publi.component.html',
  imports: [
    IonicModule,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./usu-publi.component.scss']
})
export class UsuPubliComponent implements OnInit {
  correo: string = '';
  publicaciones: Publicacion[] = [];

  constructor(
    private route: ActivatedRoute,
    private publicacionService: PublicacionService
  ) {}

  ngOnInit() {
    this.correo = this.route.snapshot.paramMap.get('correo') || '';
    if (this.correo) {
      this.obtenerPublicaciones();
    }
  }

  obtenerPublicaciones() {
    this.publicaciones = [];
    this.publicacionService.obtenerPublicacionesPorCorreo(this.correo).subscribe({
      next: (data: Publicacion[]) => {
        this.publicaciones = data;
        console.log(this.correo);
        console.log(this.publicaciones);
      },
      error: (error) => console.error('Error al obtener publicaciones:', error)
    });
  }


  eliminarPublicacion(id: number | undefined) {
    this.publicacionService.eliminarPublicacion2(id).subscribe({
      next: () => {
        this.publicaciones = this.publicaciones.filter(p => p.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar publicación:', error);
      }
    });
  }
}
