import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { menuOutline, searchOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms"; // Importar CommonModule

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // Asegúrate de agregar CommonModule aquí
  ]
})
export class NavbarComponent implements OnInit {

  isSearchVisible: boolean = false;  // Variable que controla la visibilidad del input
  searchQuery: string = '';          // Variable para almacenar el texto ingresado en el input

  constructor() {
    addIcons({ menuOutline, searchOutline });
  }

  ngOnInit() {}

  // Método para alternar la visibilidad del input
  toggleSearchInput() {
    this.isSearchVisible = !this.isSearchVisible;
  }

}
