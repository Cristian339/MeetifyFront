import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { Publicacion } from '../modelos/Publicacion';
import { NgForOf } from '@angular/common';
import {ToastService} from "../services/toast.service";

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

  constructor(private router: Router, private toast: ToastService) {}

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
    } else {
      console.log('Puntuación enviada:', this.puntuacion, 'Razón:', this.razon);
    }

  }
}
