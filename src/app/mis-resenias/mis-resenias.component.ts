import { Component, OnInit } from '@angular/core';
import {CabeceraComponent} from "../cabecera/cabecera.component";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {PuntuacionService} from "../services/puntuacion.service";
import {ReseniasMias} from "../modelos/ReseniasMias";

@Component({
    selector: 'app-mis-resenias',
    templateUrl: './mis-resenias.component.html',
    styleUrls: ['./mis-resenias.component.scss'],
    standalone: true,
  imports: [
    CabeceraComponent,
    IonicModule,
    NgForOf
  ]
})
export class MisReseniasComponent  implements OnInit {

  constructor(private puntuacionService: PuntuacionService) { }

  resenias : ReseniasMias[] = [];

  ngOnInit() {
    this.cargarResenias();
  }

    cargarResenias(){
    this.puntuacionService.obtenerMisResenias().subscribe({
      next:(data)=> {
        this.resenias = data;
      },
      error:()=> {
        console.log("Error cargando mis resenias")
      }
    })
    }

}
