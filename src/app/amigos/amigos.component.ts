import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from "@ionic/angular";
import { NgForOf, NgOptimizedImage } from "@angular/common";
import { AmigoService } from "../services/amigo.service";
import { CabeceraComponent } from "../cabecera/cabecera.component";

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  imports: [
    IonicModule,
    NgForOf,
    CabeceraComponent,
  ],
  styleUrls: ['./amigos.component.scss']
})
export class AmigosComponent implements OnInit {
  amigos: any[] = [];

  constructor(private http: HttpClient,
              private amigoService: AmigoService) {
  }

  ngOnInit() {
    this.cargarAmigos();
  }

  cargarAmigos(): void {
    console.log('Cargando amigos...');
    this.amigoService.obtenerAmigos().subscribe({
      next: (data) => {
        this.amigos = data;
        console.info(data);
      },
      error: (error) => console.error('Error:', error),
      complete: () => {
        console.log('Petición completada');
      },
    });
  }
}
