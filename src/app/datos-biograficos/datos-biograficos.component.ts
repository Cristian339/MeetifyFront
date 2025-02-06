import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  correoElectronico: string = ''; // Variable para almacenar el correo

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private activatedRoute: ActivatedRoute // Inyectamos ActivatedRoute
  ) {
    addIcons({ globeOutline, cameraOutline, linkOutline, createOutline, transgenderOutline });
  }

  ngOnInit() {
    // Accedemos al correo electrónico desde los queryParams
    this.activatedRoute.queryParams.subscribe(params => {
      this.correoElectronico = params['correoElectronico'] || ''; // Obtenemos el correo electrónico
    });
    console.log(this.correoElectronico);
  }

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

  // Usamos el correo electrónico al guardar los datos biográficos
  guardarDatosBiograficos() {
    const datosBiograficos: DatosBiograficos = {
      pais: this.pais,
      genero: this.genero,
      imagenUrlPerfil: this.imagePreview ?? undefined,
      biografia: this.biografia
    };

    // Mostramos los datos en la consola (puedes enviarlos al backend)
    console.log('Datos Biográficos:', datosBiograficos);
    console.log('Correo electrónico:', this.correoElectronico);

    this.perfilService.actualizarDatosBiografia(datosBiograficos,this.correoElectronico).subscribe({
      next: (data: any) => {
        console.info(data);
      },
      error: (error: any) => console.error('Error:', error),
      complete: () => {
        console.log('Petición completada');
        this.router.navigate(['']);
      },
    });
  }
}
