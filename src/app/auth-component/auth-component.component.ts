import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class AuthComponentComponent implements OnInit {
  @ViewChild('changePasswordModal') changePasswordModal!: IonModal;
  authForm: FormGroup = {} as FormGroup;
  Logeado = true;
  Registrado = false;
  Recuperado = false;
  Confirmado = false;
  modalAbierto = false;
  mensajeModal = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      codigo: [''],
      nuevaContra: ['', Validators.required],
      repitenuevaContra: ['', Validators.required]
    });

    if (this.Registrado) {
      this.authForm.get('contrasena')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.authForm.get('repitenuevaContra')?.setValidators([Validators.required, this.matchPasswords.bind(this)]);
    } else {
      this.authForm.get('contrasena')?.clearValidators();
      this.authForm.get('repitenuevaContra')?.clearValidators();
    }

    if (this.Confirmado) {
      this.authForm.get('codigo')?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    } else {
      this.authForm.get('codigo')?.clearValidators();
    }

    this.authForm.get('contrasena')?.updateValueAndValidity();
    this.authForm.get('repitenuevaContra')?.updateValueAndValidity();
    this.authForm.get('codigo')?.updateValueAndValidity();
  }

  toggleAuthMode(mode: string) {
    this.Logeado = mode === 'login';
    this.Registrado = mode === 'registro';
    this.Recuperado = mode === 'recuperacion';
    this.Confirmado = mode === 'confirmar';
    this.initializeForm();
  }

  matchPasswords(control: any): { [key: string]: boolean } | null {
    if (this.authForm && control.value !== this.authForm.get('nuevaContra')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.authForm.valid) {
      if (this.Logeado) {
        console.log('Inicio de sesión:', this.authForm.value);
      } else if (this.Registrado) {
        console.log('Registro:', this.authForm.value);
      } else if (this.Recuperado) {
        console.log('Recuperación de cuenta:', this.authForm.value);
      } else if (this.Confirmado) {
        console.log('Confirmación de cuenta:', this.authForm.value);
      } else {
        this.verificarContrasenas();
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  verificarCamposLogin() {
    this.router.navigate(['/editar-perfil']);
    const email = this.authForm.get('email')?.value;
    const contrasena = this.authForm.get('contrasena')?.value;

    if (!email || !contrasena) {
      this.mensajeModal = 'Por favor, ingrese su correo electrónico y contraseña';
      this.modalAbierto = true;
    } else {
      console.log('Inicio de sesión:', this.authForm.value);
      this.router.navigate(['/publicacion']);
    }
  }

  verificarCamposRegistro() {
    const firstName = this.authForm.get('firstName')?.value;
    const lastName = this.authForm.get('lastName')?.value;
    const email = this.authForm.get('email')?.value;
    const contrasena = this.authForm.get('contrasena')?.value;
    const username = this.authForm.get('username')?.value;
    const fechaNacimiento = this.authForm.get('fecha')?.value;
    const nuevaContra = this.authForm.get('nuevaContra')?.value;
    const repitenuevaContra = this.authForm.get('repitenuevaContra')?.value;

    if (!firstName || !lastName || !email || !contrasena || !nuevaContra || !repitenuevaContra || !username || !fechaNacimiento) {
      this.mensajeModal = 'Por favor, complete todos los campos';
      this.modalAbierto = true;
    } else if (nuevaContra !== repitenuevaContra) {
      this.mensajeModal = 'Las contraseñas no coinciden';
      this.modalAbierto = true;
    } else {
      console.log('Registro:', this.authForm.value);
    }
  }

  verificarCamposRecuperacion() {
    const email = this.authForm.get('email')?.value;

    if (!email) {
      this.mensajeModal = 'Por favor, ingrese su correo electrónico';
      this.modalAbierto = true;
    } else {
      console.log('Recuperación de cuenta:', this.authForm.value);
      this.toggleAuthMode('confirmar');
    }
  }

  verificarCamposConfirmacion() {
    const codigo = this.authForm.get('codigo')?.value;

    if (!codigo) {
      this.mensajeModal = 'Por favor, ingrese el código de confirmación';
      this.modalAbierto = true;
    } else {
      console.log('Confirmación de cuenta:', this.authForm.value);
      this.toggleAuthMode('nuevaContra')
    }
  }

  verificarContrasenas() {
    const nuevaContra = this.authForm.get('nuevaContra')?.value;
    const repitenuevaContra = this.authForm.get('repitenuevaContra')?.value;

    if (!nuevaContra || !repitenuevaContra) {
      this.mensajeModal = 'Por favor, ingrese ambas contraseñas';
      this.modalAbierto = true;
    } else if (nuevaContra === repitenuevaContra) {
      this.toggleAuthMode('login');
    } else {
      this.mensajeModal = 'Las contraseñas no coinciden';
      this.modalAbierto = true;
    }
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  reenviarCodigo() {
    console.log('Código reenviado');
  }
}
