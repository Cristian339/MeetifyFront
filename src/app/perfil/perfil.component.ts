import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { arrowBackOutline, constructOutline, settingsOutline, starOutline, trophyOutline } from "ionicons/icons";
import { NgForOf, NgIf } from "@angular/common";
import {ActivatedRoute, Router} from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { PublicacionService } from '../services/publicacion.service';
import { Perfil } from '../modelos/Perfil';
import { Publicacion } from '../modelos/Publicacion';
import {Categoria} from "../modelos/Categoria";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    NgIf
  ]
})
export class PerfilComponent implements OnInit {
  perfil: Perfil | undefined;
  categorias: Categoria[] = [];

  @Input() publicaciones: Publicacion[] | undefined;
  @Output() profileClick = new EventEmitter<Publicacion>();

  onProfileClick(publicacion: Publicacion) {
    this.profileClick.emit(publicacion);
  }

  constructor(
    private perfilService: PerfilService,
    private publicacionService: PublicacionService,
    private router: Router
  ) {
    addIcons({ settingsOutline, arrowBackOutline, constructOutline, starOutline, trophyOutline });
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

  }


  cargarPublicaciones(): void {
    this.publicaciones = [];
    this.publicacionService.getMisPublicaciones().subscribe({
      next: (data) => {
        console.log('Publicaciones received:', data);
        this.publicaciones = data;
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Request completed')
    });
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
