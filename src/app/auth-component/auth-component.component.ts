import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  authForm: FormGroup = {} as FormGroup;
  Logeado = true;
  Registrado = false;
  Recuperado = false;
  Confirmado = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  // Inicializa el formulario según si está en login, registro, recuperación o confirmación
  initializeForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: [''],
      confirmarContrasena: [''],
      codigo: ['']
    });

    if (this.Registrado) {
      this.authForm.get('contraseña')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.authForm.get('confirmarContrasena')?.setValidators([Validators.required, this.matchPasswords.bind(this)]);
    } else {
      this.authForm.get('contraseña')?.clearValidators();
      this.authForm.get('confirmarContrasena')?.clearValidators();
    }

    if (this.Confirmado) {
      this.authForm.get('codigo')?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    } else {
      this.authForm.get('codigo')?.clearValidators();
    }

    this.authForm.get('contrasena')?.updateValueAndValidity();
    this.authForm.get('confirmarContrasena')?.updateValueAndValidity();
    this.authForm.get('v')?.updateValueAndValidity();
  }

  // Alterna entre las vistas de login, registro, recuperación y confirmación
  toggleAuthMode(mode: string) {
    this.Logeado = mode === 'login';
    this.Registrado = mode === 'registro';
    this.Recuperado = mode === 'recuperacion';
    this.Confirmado = mode === 'confirmar';
    this.initializeForm();
  }

  // Valida que las contraseñas coincidan
  matchPasswords(control: any): { [key: string]: boolean } | null {
    if (this.authForm && control.value !== this.authForm.get('contrasena')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  // Maneja el envío del formulario
  onSubmit() {
    if (this.authForm.valid) {
      if (this.Logeado) {
        console.log('Inicio de sesión:', this.authForm.value);
        // Implementa la lógica de inicio de sesión
      } else if (this.Registrado) {
        console.log('Registro:', this.authForm.value);
        // Implementa la lógica de registro
      } else if (this.Recuperado) {
        console.log('Recuperación de cuenta:', this.authForm.value);
        // Implementa la lógica de recuperación de cuenta
      } else if (this.Confirmado) {
        console.log('Confirmación de cuenta:', this.authForm.value);
        // Implementa la lógica de confirmación de cuenta
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  reenviarCodigo() {
    console.log('Código reenviado');
    // Implementa la lógica para reenviar el código de confirmación
  }
}
