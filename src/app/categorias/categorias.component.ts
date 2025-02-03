import { Component } from '@angular/core';
import {IonicModule, ToastController} from '@ionic/angular';
import {NgClass} from "@angular/common";
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {CategoriasService} from "../services/categorias.service";
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  imports: [
    IonicModule,
    NgClass,
    CommonModule
  ]
})
export class CategoriasComponent {
  selectedCategories: string[] = [];

  constructor(
    private toastController: ToastController,
    private router: Router,
    private categoriasService: CategoriasService  // Inyectar el servicio
  ) {}

  toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else if (this.selectedCategories.length < 10) {
      this.selectedCategories.push(category);
    }
  }

  async saveCategories() {
    console.log('Categorías seleccionadas:', this.selectedCategories);

    // Llamar al servicio para enviar las categorías seleccionadas al backend
    this.categoriasService.actualizarCategorias(this.selectedCategories).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Categorías guardadas!',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
        this.router.navigate(['/publicacion']);
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Error al guardar categorías.',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      }
    });
  }
}
