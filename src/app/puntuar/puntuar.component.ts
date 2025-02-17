import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { Publicacion } from '../modelos/Publicacion';
import { NgForOf } from '@angular/common';
import { ToastService } from '../services/toast.service';
import { PuntuacionService } from '../services/puntuacion.service';
import { Reputacion } from '../modelos/Reputacion';

@Component({
  selector: 'app-puntuar',
  templateUrl: './puntuar.component.html',
  styleUrls: ['./puntuar.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CabeceraComponent, NgForOf]
})
export class PuntuarComponent implements OnInit {
  p!: Publicacion;
  razon: string = '';
  puntuacion: number = 0;

  constructor(
    private router: Router,
    private toast: ToastService,
    private puntuacionService: PuntuacionService
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.p = navigation.extras.state['publicacion'];
    }
  }

  rate(star: number) {
    this.puntuacion = star;
  }

  subirValoracion() {
    if (this.puntuacion === 0) {
      this.toast.presentToast('La puntuación no puede ser cero.', 'warning');
    } else if (this.p && this.p.id !== undefined) {
      console.log('Puntuando publicación:', this.p.id, this.puntuacion, this.razon);
      console.log('Publicación:', this.p);
      console.log('Publicación:', this.razon);
      this.puntuacionService.puntuarPublicacion(this.p.id, this.puntuacion, this.razon).subscribe({
        next: (reputacion: Reputacion) => {
          this.toast.presentToast('Puntuación enviada con éxito.', 'success');
          console.log('Puntuación enviada:', reputacion);
        },
        error: (error) => {
          this.toast.presentToast('Error al enviar la puntuación.', 'warning');
          console.error('Error al enviar la puntuación:', error);
        }
      });
    } else {
      this.toast.presentToast('Publicación no encontrada.', 'warning');
    }
  }
}
