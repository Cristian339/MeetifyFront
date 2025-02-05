import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ]
})
export class NavbarComponent implements OnInit {

  isSearchVisible: boolean = false;
  searchQuery: string = '';
  vistaActual: 'main' | 'config' = 'main';
  menuItems = [
    { label: 'Eventos', icon: 'calendar-outline', route: '/events' },
    { label: 'Amigos', icon: 'people-outline', route: '/friends' },
    /*{ label: 'Mis actividades y configuración', icon: 'settings-outline', route: '/settings' },*/
    { label: 'Mi reputación', icon: 'bar-chart-outline', route: '/reputation' },
    { label: 'Editar perfil', icon: 'create-outline', route: '/editar-perfil' }
  ];

  menuActivities = [
    { label: 'Configurar perfil', icon: 'person-outline', route: '/events' },
    { label: 'Eventos compartidos', icon: 'share-outline', route: '/friends' },
    { label: 'Eventos que me he unido', icon: 'arrow-redo-outline', route: '/reputation' },
    { label: 'Reseñas que hice', icon: 'star-half-outline', route: '/editar-perfil' },
    { label: 'Privacidad', icon: 'lock-closed-outline', route: '/editar-perfil' }
  ];

  constructor(private menu: MenuController, private router: Router) {
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

  closeMenu() {
    this.menu.close();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeMenu();
  }

  setVista(view: 'main'  | 'config') {
    this.vistaActual = view;
  }
}
