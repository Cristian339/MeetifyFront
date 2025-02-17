import { Component, OnInit, ViewChild } from '@angular/core';
import {IonicModule, MenuController, IonModal, ModalController} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  menuOutline,
  searchOutline,
  notificationsOutline,
  calendarOutline,
  peopleOutline,
  personOutline,
  settingsOutline,
  barChartOutline,
  createOutline,
  arrowBackCircle,
  shareOutline,
  arrowRedoOutline,
  starHalfOutline,
  lockClosedOutline
} from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { LoginService } from "../services/login.service";
import { PerfilService } from "../services/perfil.service";
import {PublicacionComponent} from "../publicacion/publicacion.component";
import {ModalService} from "../services/modal.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class NavbarComponent implements OnInit {
  @ViewChild('modalConfirm') modalConfirm: IonModal | undefined;
  @ViewChild('modalPassword') modalPassword: IonModal | undefined;
  @ViewChild('modalBusqueda') modalBusqueda: IonModal | undefined;

  password: string = '';

  isSearchVisible: boolean = false;
  searchQuery: string = '';
  vistaActual: 'main' | 'config' = 'main';
  menuItems = [
    { label: 'Eventos', icon: 'calendar-outline', route: '/events' },
    { label: 'Amigos', icon: 'people-outline', route: '/amigos' },
    { label: 'Mi reputación', icon: 'bar-chart-outline', route: '/reputation' },
  ];

  menuActivities = [
    { label: 'Configurar perfil', icon: 'person-outline', route: '/editar-perfil' },
    { label: 'Eventos compartidos', icon: 'share-outline', route: '/friends' },
    { label: 'Eventos que me he unido', icon: 'arrow-redo-outline', route: '/reputation' },
    { label: 'Reseñas que hice', icon: 'star-half-outline', route: '/reputation' },
    { label: 'Privacidad', icon: 'lock-closed-outline', route: '/editar-perfil' },
  ];

  constructor(private modalService: ModalService, private menu: MenuController, private router: Router, private loginService: LoginService, private perfilService: PerfilService) {
    addIcons({
      menuOutline,
      searchOutline,
      notificationsOutline,
      calendarOutline,
      peopleOutline,
      personOutline,
      settingsOutline,
      barChartOutline,
      createOutline,
      arrowBackCircle,
      shareOutline,
      arrowRedoOutline,
      starHalfOutline,
      lockClosedOutline
    });
  }

  ngOnInit() {}

  toggleSearchInput() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  abrirModal() {
    this.modalService.abrirModal();
    console.log('Modal abierto desde pie-pagina');
  }

  closeMenu() {
    this.menu.close();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeMenu();
  }

  setVista(view: 'main' | 'config') {
    this.vistaActual = view;
  }

  doLogout() {
    sessionStorage.clear();
    this.loginService.setAuthState(false);
    this.router.navigate(['']);
  }

  // Abre el primer modal (confirmación de eliminación)
  openConfirmModal() {
    if (this.modalConfirm) {
      this.modalConfirm.present();
    }
  }

  openBusquedaModal() {
    if (this.modalBusqueda) {
      console.log("abierto")
      this.modalBusqueda.present();
    }
  }

  // Cierra el primer modal y abre el segundo (solicitud de contraseña)
  confirmDelete() {
    if (this.modalConfirm) {
      this.modalConfirm.dismiss();  // Cierra el modal de confirmación
    }
    if (this.modalPassword) {
      this.modalPassword.present(); // Abre el modal de contraseña
    }
  }



  borrarCuenta(contrasenia: string){
    console.log(contrasenia)
    this.perfilService.borrarCuenta(contrasenia).subscribe({
      next: () => {
        this.router.navigate(['']);
        this.modalPassword?.dismiss()
      },
      error: () => {
        console.log("contraseña incorrecta")
      }

    })
  }
}
