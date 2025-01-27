import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { arrowBackOutline, constructOutline, settingsOutline, starOutline, trophyOutline } from "ionicons/icons";
import { NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { PerfilService } from '../services/perfil.service';
import { Perfil } from '../modelos/Perfil';

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

  constructor(
      private perfilService: PerfilService,
      private route: ActivatedRoute
  ) {
    addIcons({ settingsOutline, arrowBackOutline, constructOutline, starOutline, trophyOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.perfilService.getPerfil(+id).subscribe({
        next: (data: Perfil) => {
          this.perfil = data;
          console.log('Data:', data);
        },
        error: (error) => console.error('Error:', error),
        complete: () => console.log('Request completed')
      });
    }
  }
}
