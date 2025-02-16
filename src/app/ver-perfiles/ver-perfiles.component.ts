import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { Perfil } from "../modelos/Perfil";
import { PerfilService } from "../services/perfil.service";
import { CabeceraComponent } from "../cabecera/cabecera.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ver-perfiles',
  templateUrl: './ver-perfiles.component.html',
  styleUrls: ['./ver-perfiles.component.scss'],
  standalone: true,
  imports: [
    CabeceraComponent,
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class VerPerfilesComponent implements OnInit {
  perfiles: Perfil[] = [];
  perfilesFiltrados: Perfil[] = [];
  busqueda: string = '';

  constructor(private perfilService: PerfilService,private router : Router) {}

  ngOnInit() {
    this.cargarPerfiles();
  }

  cargarPerfiles() {
    this.perfilService.getTodosLosPerfiles().subscribe({
      next: (data) => {
        this.perfiles = data;
        this.perfilesFiltrados = data;
        console.log(this.perfiles);
      },
      error: () => {
        console.log("Error al cargar los perfiles");
      }
    });
  }

  filtrarPerfiles() {
    const filtro = this.busqueda.toLowerCase();
    this.perfilesFiltrados = this.perfiles.filter(perfil =>
      perfil.nombre?.toLowerCase().includes(filtro) ||
      perfil.apellidos?.toLowerCase().includes(filtro) ||
      perfil.nombreUsuario?.toLowerCase().includes(filtro)
    );
  }


  entrarPerfil(id: number | undefined) {
    this.router.navigate(['/perfil-ajeno'], { queryParams: { id } });
  }
}
