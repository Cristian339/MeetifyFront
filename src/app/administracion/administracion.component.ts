import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { settingsOutline, banOutline, personCircleOutline, arrowBackCircle, caretUpOutline, arrowForwardOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PerfilService } from "../services/perfil.service";
import { Perfil } from "../modelos/Perfil";
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import {Publicacion} from "../modelos/Publicacion";
import {PublicacionService} from "../services/publicacion.service";
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {CabeceraComponent} from "../cabecera/cabecera.component";
import { ToastService} from "../services/toast.service";
import {CabeceraSinRutaComponent} from "../cabecera-sin-ruta/cabecera-sin-ruta.component";

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CabeceraSinRutaComponent,
    CabeceraComponent
  ]
})
export class AdministracionComponent implements OnInit {

  mostrarDeslizador: boolean = false;
  diasBaneo: number = 0;
  perfiles: Perfil[] = [];
  correoBan: string = '';
  publicaciones: Publicacion[] = [];
  modalVisible = false;

  vistaActual: 'admin' | 'users' | 'baneados' = 'admin';

  constructor(private toast: ToastService , private perfilService: PerfilService, private router : Router, private loginService : LoginService) {
    addIcons({ settingsOutline, banOutline, personCircleOutline, arrowBackCircle, caretUpOutline, arrowForwardOutline });
  }

  ngOnInit() { }

  cargarBaneados(): void {
    this.perfiles = [];
    this.perfilService.getPerfilesBaneados().subscribe({
      next: (data) => {
        this.perfiles = data;
        if (this.perfiles.length === 0) {
          this.toast.presentToast('No hay usuarios baneados.', 'warning');
        } else {
          this.vistaActual = 'baneados';
        }
        console.info(data);
      },
      error: (error) => {
        console.error('Error:', error);
        this.toast.presentToast('Error al cargar usuarios baneados.', 'error');
      },
      complete: () => {
        console.log('Petición completada');
      },
    });
  }

  cargarNoBaneados(): void {
    this.perfiles = [];
    this.perfilService.getPerfilesNoBaneados().subscribe({
      next: (data) => {
        this.perfiles = data;
        console.info(data);
      },
      error: (error) => {
        console.error('Error:', error);
        this.toast.presentToast('Error al cargar usuarios no baneados.', 'error');
      },
      complete: () => {
        console.log('Petición completada');
      },
    });
  }

  viajarA(view: 'admin' | 'users' | 'baneados') {
    this.vistaActual = view;

    if (view === 'admin') {
      return;
    }

    if (view === 'users') {
      this.cargarNoBaneados();
    } else if (view === 'baneados') {
      this.cargarBaneados();
    }
  }

  cambiarTitulo(): string {
    switch (this.vistaActual) {
      case 'admin':
        return 'Administración';
      case 'users':
        return 'Usuarios';
      case 'baneados':
        return 'Lista de baneados';
      default:
        return '';
    }
  }

  aceptarBaneo() {
    console.log("Baneo temporal de " + this.diasBaneo + " días");
  }

  Deslizar() {
    this.mostrarDeslizador = !this.mostrarDeslizador;
  }


  banearUsuario(correo: string | undefined) {
    this.perfilService.banearPerfil(correo).subscribe({
      next: (data) => {
        console.log("Usuario baneado correctamente");
        this.toast.presentToast('Usuario baneado correctamente.', 'success');
        this.cargarNoBaneados();
      },
      error: (error) => {
        console.error('Error:', error);
        this.toast.presentToast('Error al banear usuario.', 'error');
      },
      complete: () => {
        console.log('Usuario baneado exitosamente');
      },
    });
  }

  desbanearUsuario(correo: string | undefined) {
    this.perfilService.desbanearPerfil(correo).subscribe({
      next: () => {
        console.log("Usuario desbaneado correctamente");
        this.toast.presentToast('Usuario desbaneado correctamente.', 'success');
        this.cargarBaneados();
      },
      error: (error) => {
        console.error('Error:', error);
        this.toast.presentToast('Error al desbanear usuario.', 'error');
      },
      complete: () => {
        console.log('Usuario desbaneado exitosamente');
      },
    });
  }


  doLogout() {
    sessionStorage.clear();
    this.loginService.setAuthState(false);
    this.router.navigate(['']);
  }

  // verPublicaciones(correo: string | undefined) {
  //   this.publicaciones = [];
  //
  //   console.log(correo);
  //   if (correo) {
  //     this.publicacionService.obtenerPublicacionesPorCorreo(correo).subscribe({
  //       next: (data: Publicacion[]) => {
  //         this.publicaciones = data;
  //
  //       },
  //       error: (error) => console.error('Error al obtener publicaciones:', error),
  //       complete: () => {
  //         this.modalVisible = true;
  //       },
  //     });
  //   }
  // }

  verPublicaciones(correo: string | undefined) {
    if (correo) {
      this.router.navigate(['/usu-publi', correo]); // Redirige con el correo como parámetro
    }
  }

  cerrarModal() {
    this.modalVisible = false;
  }
}
