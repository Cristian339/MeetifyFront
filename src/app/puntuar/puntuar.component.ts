import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { Publicacion } from '../modelos/Publicacion';
import { NgForOf } from '@angular/common';

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

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.p = navigation.extras.state['publicacion'];
    }
  }

  rate(star: number) {
    this.puntuacion = star;
  }

  puntuar() {
    console.log('Puntuación enviada:', this.puntuacion, 'Razón:', this.razon);

  }
}
