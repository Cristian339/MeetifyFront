import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { Publicacion } from '../modelos/Publicacion';

@Component({
  selector: 'app-puntuar',
  templateUrl: './puntuar.component.html',
  styleUrls: ['./puntuar.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CabeceraComponent]
})
export class PuntuarComponent implements OnInit {
  publicacion!: Publicacion;
  valoracion: number = 3;
  razon: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.publicacion = navigation.extras.state['publicacion'];
    }
  }

  puntuar() {
    console.log('Puntuación enviada:', this.valoracion, 'Razón:', this.razon);
  }
}
