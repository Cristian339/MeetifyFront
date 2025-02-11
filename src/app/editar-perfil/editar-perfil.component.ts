import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule, ToastController } from "@ionic/angular";
import { NgForOf, NgIf } from "@angular/common";
import { addIcons } from "ionicons";
import { checkmarkOutline, closeOutline } from "ionicons/icons";
import { Perfil } from "../modelos/Perfil";
import { PerfilService } from "../services/perfil.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Categoria } from "../modelos/Categoria";

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    NgForOf,
    FormsModule
  ]
})
export class EditarPerfilComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  isLink: boolean = false;
  isModalOpen = false;
  newPhotoUrl: string = '';
  perfil: Perfil | undefined;
  paises: string[] = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
  editarCorreo: boolean = false;
  editarGenero: boolean = false;
  categorias: Categoria[] = [];
  filteredCategorias: Categoria[] = [];
  categoriasElegidas: Categoria[] = [];
  searchTermCategorias: string = '';
  buttonDisabledState: { [key: string]: boolean } = {}; // Add this property

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ closeOutline, checkmarkOutline });
  }

  ngOnInit() {
    this.perfilService.getPerfil().subscribe({
      next: (data) => {
        this.perfil = data;
      },
      error: (error) => console.error('Error:', error)
    });

    this.cargarCategorias()
    this.cargarCategoriasElegidas()
  }

  modificarInfoPrivadaCorreo() {
    this.editarCorreo = true;
  }

  modificarInfoPrivadaGenero() {
    this.editarGenero = true;
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 5000,
      position: 'bottom',
      cssClass: 'toast-center'
    });
    await toast.present();
  }

  actualizarPerfil() {
    if (this.perfil) {
      this.perfilService.actualizarPerfil(this.perfil).subscribe({
        next: () => {
          this.router.navigate(['/perfil']);
          this.mostrarToast('Perfil actualizado correctamente');
        },
        error: (error) => console.error('Error:', error)
      });
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
    });
  }

  guardarImagen() {
    if (this.isLink && this.newPhotoUrl) {
      // @ts-ignore
      this.perfil.imagenUrlPerfil = this.newPhotoUrl;
    } else if (this.selectedFile) {
      // Assuming you have a method to upload the file and get the URL
      this.uploadFile(this.selectedFile).then((url: string) => {
        // @ts-ignore
        this.perfil.imagenUrlPerfil = url;
      });
    }
    this.closeModal();
  }

  cargarCategorias() {
    this.perfilService.verTodasLasCategorias().subscribe(categorias => {
      this.categorias = categorias;
      this.filteredCategorias = categorias;
    });
  }

  cargarCategoriasElegidas() {
    this.perfilService.verCategoriasElegidasPorPerfil('your-token-here').subscribe(categorias => {
      this.categoriasElegidas = categorias;
      this.filteredCategorias = categorias;
    });
  }

  filterCategorias() {
    this.filteredCategorias = this.categorias.filter(categoria =>
      categoria.nombre?.toLowerCase().includes(this.searchTermCategorias.toLowerCase())
    );
  }

  filterCategorias2() {
    this.filteredCategorias = this.categoriasElegidas.filter(categoria =>
      categoria.nombre.toLowerCase().includes(this.searchTermCategorias.toLowerCase())
    );
  }

  anadirCategoria(categoria: Categoria) {
    if (categoria.id !== undefined) {
      this.perfilService.anadirCategoriaExistenteAPerfil(categoria).subscribe(
        () => this.buttonDisabledState[categoria.id] = true,
        error => console.error('Error adding category:', error)
      );
    } else {
      console.error('Categoria id is undefined');
    }
  }

  eliminarCategoria(categoria: Categoria) {
    this.perfilService.eliminarCategoriaPreferenteDePerfil(categoria).subscribe(() => {
      this.cargarCategoriasElegidas();
    });
  }

  isButtonDisabled(categoria: Categoria): boolean {
    return categoria.id !== undefined ? this.buttonDisabledState[categoria.id] || false : false;
  }

  isButtonDisabled2(categoria: Categoria): boolean {
    return categoria.id !== undefined ? this.buttonDisabledState[categoria.id] || false : false;
  }
}
