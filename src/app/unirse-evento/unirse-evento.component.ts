import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { arrowBackCircle, personCircleOutline, locationOutline } from "ionicons/icons";
import { Publicacion } from "../modelos/Publicacion";
import { PublicacionService } from "../services/publicacion.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CommonModule, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {PiePaginaComponent} from "../pie-pagina/pie-pagina.component";

@Component({
  selector: 'app-unirse-evento',
  templateUrl: './unirse-evento.component.html',
  styleUrls: ['./unirse-evento.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PiePaginaComponent,
    RouterLink,
  ]
})
export class UnirseEventoComponent implements OnInit {

  publicacion: Publicacion | undefined;
  dentro : boolean = false;
  constructor(
    private publicacionService: PublicacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({ arrowBackCircle, personCircleOutline, locationOutline });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const id = navigation.extras.state['id'];
      if (id) {
        this.cargarPublicacion(id);
        console.log('ID de la publicación cargada:', id);
      } else {
        this.publicacion = navigation.extras.state['publicacion'];
        console.log('Publicación cargada:', this.publicacion);
      }
    }
    this.estado(this.publicacion?.id);
  }

  salirPublicacion(publicacion: Publicacion) {
    if (publicacion.id !== undefined) {
      this.publicacionService.salirPublicacion(publicacion.id).subscribe(() => {
        console.log('Salido de la publicación con éxito');
        this.dentro=false;
      }, (error) => {
        console.error('Error al salir de la publicación:', error);
      });
    } else {
      console.error('El id de la publicación no está definido');
    }
  }


  unirseEvento() {
    if (this.publicacion?.id) {
      this.publicacionService.unirsePublicacion(this.publicacion.id).subscribe(() => {
        console.log('Unido a la publicación con éxito');
        this.dentro=true;
      }, (error: HttpErrorResponse) => {
        console.error('Error al unirse a la publicación:', error);
        if (error.status === 500) {
          alert('Ocurrió un error en el servidor. Por favor, inténtelo de nuevo más tarde.');
        } else {
          alert(`Error: ${error.message}`);
        }
      });
    }
  }

  estado(id : number | undefined){
    this.publicacionService.dentroOFuera(id).subscribe({
      next:(data)=> {
        this.dentro=data;
      },
      error:()=> {
        console.log("No se pudo obtener el estado")
      }
    })
  }

  cargarPublicacion(idPub: number) {
    this.publicacionService.obtenerPublicacionPorId(idPub).subscribe(
      (data: Publicacion) => {
        this.publicacion = data;
        console.log('Publicación cargada:', this.publicacion);
      },
      error => {
        console.error('Error al cargar la publicación:', error);
      }
    );
  }
}
