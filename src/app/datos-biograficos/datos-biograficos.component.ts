import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { CabeceraComponent } from "../cabecera/cabecera.component";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { addIcons } from "ionicons";
import { globeOutline, cameraOutline, linkOutline, createOutline, transgenderOutline } from "ionicons/icons";
import { PerfilService } from "../services/perfil.service";
import { DatosBiograficos } from "../modelos/DatosBiograficos";

@Component({
  selector: 'app-datos-biograficos',
  templateUrl: './datos-biograficos.component.html',
  styleUrls: ['./datos-biograficos.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CabeceraComponent,
    NgIf,
    FormsModule
  ]
})
export class DatosBiograficosComponent implements OnInit {
  imagePreview: string | null = null;
  imagenUrlPerfil: string = '';
  pais: string = '';
  genero: string = '';
  biografia: string = '';
  showURLInput: boolean = false;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ) {
    addIcons({ globeOutline, cameraOutline, linkOutline, createOutline, transgenderOutline });
  }

  ngOnInit() {}

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateImagePreview() {
    this.imagePreview = this.imagenUrlPerfil;
  }

  toggleURLInput() {
    this.showURLInput = !this.showURLInput;
    if (this.showURLInput) {
      this.imagePreview = null;
    }
  }

// En tu componente
  guardarDatosBiograficos() {
    const datosBiograficos: DatosBiograficos = {
      pais: this.pais,
      genero: this.genero,
      imagenUrlPerfil: this.imagePreview ?? undefined,
      biografia: this.biografia
    };

    // Mostrar los datos del perfil en la consola
    console.log('Datos Biográficos:', datosBiograficos);

    this.perfilService.actualizarDatosBiografia(datosBiograficos).subscribe({
      next: (data: any) => {
        console.info(data);
      },
      error: (error: any) => console.error('Error:', error),
      complete: () => {
        console.log('Petición completada');
        this.router.navigate(['/publicacion']);
      },
    });
  }
}
