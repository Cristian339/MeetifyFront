import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { arrowBackOutline, constructOutline, settingsOutline, starOutline, trophyOutline } from "ionicons/icons";
import { NgForOf, NgIf } from "@angular/common";
import {Router} from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { PublicacionService } from '../services/publicacion.service';
import { Perfil } from '../modelos/Perfil';
import { Publicacion } from '../modelos/Publicacion';

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

  @Input() publicaciones: Publicacion[];
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

  verPublicacion(post: any) {
    this.router.navigate(['/gestion-publicacion'], { state: { post } });
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

    this.publicacionService.getMisPublicaciones().subscribe({
      next: (data) => {
        console.log('Publicaciones received:', data);
        this.publicaciones = data;
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Request completed')
    });
  }

}
