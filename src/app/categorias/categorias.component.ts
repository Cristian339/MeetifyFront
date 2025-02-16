import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgClass } from "@angular/common";
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriasService } from "../services/categorias.service";
import { ToastService } from '../services/toast.service';

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
export class CategoriasComponent implements OnInit {
  selectedCategories: string[] = [];
  correoElectronico: string = '';

  constructor(
    private toastService: ToastService,
    private router: Router,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit() {
  }

  async toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else if (this.selectedCategories.length < 10) {
      this.selectedCategories.push(category);
    } else {
      await this.toastService.presentToast('Solo se pueden elegir 10 categorías.', 'error');
    }
  }

  // Categorias.component.ts
  async saveCategories() {

    if (this.selectedCategories.length === 0) {
      await this.toastService.presentToast('Debe elegir al menos una categoría.', 'error');
      return;
    }

    console.log('Categorías seleccionadas:', this.selectedCategories);

    // Llamar al servicio para enviar las categorías seleccionadas al backend, junto con el correo electrónico
    this.categoriasService.actualizarCategorias(this.selectedCategories).subscribe({
      next: async () => {
        await this.toastService.presentToast('Categorías guardadas!', 'success');
        // Redirigimos a la página /sobre-ti pasando el correo como queryParam
        this.router.navigate(['/sobre-ti']);
        //this.router.navigate(['']);
      },
      error: async (err) => {
        await this.toastService.presentToast('Error al guardar categorías.', 'error');
      }
    });
  }

}
