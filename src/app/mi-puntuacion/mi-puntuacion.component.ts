import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PuntuacionService } from '../services/puntuacion.service';
import { MiPuntuacion } from '../modelos/MiPuntuacion';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-mi-puntuacion',
  templateUrl: './mi-puntuacion.component.html',
  styleUrls: ['./mi-puntuacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    NgForOf
  ]
})
export class MiPuntuacionComponent implements OnInit {
  miPuntuacion: MiPuntuacion[] = [];

  constructor(private puntuacionService: PuntuacionService) { }

  ngOnInit() {
    this.puntuacionService.miReputacion().subscribe({
      next: (data: MiPuntuacion[]) => {
        this.miPuntuacion = data;
      },
      error: (error) => {
        console.error('Error fetching mi reputacion:', error);
      }
    });
  }
}
