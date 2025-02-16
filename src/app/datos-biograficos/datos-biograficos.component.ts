import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { addIcons } from "ionicons";
import { globeOutline, cameraOutline, linkOutline, createOutline, transgenderOutline } from "ionicons/icons";
import { PerfilService } from "../services/perfil.service";
import { DatosBiograficos } from "../modelos/DatosBiograficos";
import {CabeceraSinRutaComponent} from "../cabecera-sin-ruta/cabecera-sin-ruta.component";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-datos-biograficos',
  templateUrl: './datos-biograficos.component.html',
  styleUrls: ['./datos-biograficos.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    FormsModule,
    CabeceraSinRutaComponent,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DatosBiograficosComponent implements OnInit {
  paises: string[] = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
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
    private activatedRoute: ActivatedRoute,
    private toast: ToastService
  ) {
    addIcons({ globeOutline, cameraOutline, linkOutline, createOutline, transgenderOutline });
  }

  ngOnInit() {
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
    if (this.imagenUrlPerfil.length > 255) {
      this.toast.presentToast('La URL de la imagen no puede exceder los 255 caracteres.', 'error');
      this.imagenUrlPerfil = '';
      this.imagePreview = null;
    } else {
      this.imagePreview = this.imagenUrlPerfil;
    }
  }

  toggleURLInput() {
    this.showURLInput = !this.showURLInput;
    if (this.showURLInput) {
      this.imagePreview = null;
    }
  }

  // Usamos el correo electrónico al guardar los datos biográficos
  guardarDatosBiograficos() {
    if (!this.pais && !this.genero && !this.imagePreview && !this.biografia) {
      this.toast.presentToast('Debe rellenar al menos un campo antes de finalizar.', 'error');
      return;
    }

    const datosBiograficos: DatosBiograficos = {
      pais: this.pais,
      genero: this.genero,
      imagenUrlPerfil: this.imagePreview ?? undefined,
      biografia: this.biografia
    };

    console.log('Datos Biográficos:', datosBiograficos);

    this.perfilService.actualizarDatosBiografia(datosBiograficos).subscribe({
      next: (data: any) => {
        console.info(data);
        console.log('Petición completada');
        this.perfilService.setEstadoEntrada().subscribe({
          next:()=>{
            this.router.navigate(['/publicacion']);
          },
          error:()=> {
            console.log("Error al cambiar el estado");

          }
        })
      },
      error: (error: any) => console.error('Error:', error),
      complete: () => {
      },
    });
  }
}
