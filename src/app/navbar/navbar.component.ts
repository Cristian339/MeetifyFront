import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { menuOutline, searchOutline, notificationsOutline, calendarOutline, peopleOutline, personOutline, settingsOutline, barChartOutline, createOutline } from 'ionicons/icons';
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
  menuItems = [
    { label: 'Notificaciones', icon: 'notifications-outline', route: '/notifications' },
    { label: 'Eventos', icon: 'calendar-outline', route: '/events' },
    { label: 'Grupos', icon: 'people-outline', route: '/groups' },
    { label: 'Amigos', icon: 'person-outline', route: '/friends' },
    { label: 'Mis actividades y configuración', icon: 'settings-outline', route: '/settings' },
    { label: 'Mi reputación', icon: 'bar-chart-outline', route: '/reputation' },
    { label: 'Editar perfil', icon: 'create-outline', route: '/edit-profile' }
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
      createOutline
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
}
