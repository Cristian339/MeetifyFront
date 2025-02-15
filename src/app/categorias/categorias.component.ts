import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { NgClass } from "@angular/common";
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriasService } from "../services/categorias.service";

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
    private toastController: ToastController,
    private router: Router,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit() {
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else if (this.selectedCategories.length < 10) {
      this.selectedCategories.push(category);
    }
  }

  // Categorias.component.ts
  async saveCategories() {
    console.log('Categorías seleccionadas:', this.selectedCategories);

    // Llamar al servicio para enviar las categorías seleccionadas al backend, junto con el correo electrónico
    this.categoriasService.actualizarCategorias(this.selectedCategories).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Categorías guardadas!',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
        // Redirigimos a la página /sobre-ti pasando el correo como queryParam
        this.router.navigate(['/sobre-ti']);
        //this.router.navigate(['']);
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
