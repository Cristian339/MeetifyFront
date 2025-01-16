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
  isLogin = true; // Controla si el usuario está en la vista de inicio de sesión o registro

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  // Inicializa el formulario según si está en login o registro
  initializeForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // El campo confirmPassword solo se valida en modo registro
      confirmPassword: ['']
    });

    if (!this.isLogin) {
      this.authForm.get('confirmPassword')?.setValidators([
        Validators.required,
        this.matchPasswords.bind(this)
      ]);
    } else {
      this.authForm.get('confirmPassword')?.clearValidators();
    }

    this.authForm.get('confirmPassword')?.updateValueAndValidity();
  }

  // Alterna entre las vistas de login y registro
  toggleAuthMode() {
    this.isLogin = !this.isLogin;
    this.initializeForm();
  }

  // Valida que las contraseñas coincidan
  matchPasswords(control: any): { [key: string]: boolean } | null {
    if (this.authForm && control.value !== this.authForm.get('password')?.value) {
      return { mismatch: true };
    }
    return null;
  }

  // Maneja el envío del formulario
  onSubmit() {
    if (this.authForm.valid) {
      if (this.isLogin) {
        console.log('Inicio de sesión:', this.authForm.value);
        // Implementa la lógica de inicio de sesión
      } else {
        console.log('Registro:', this.authForm.value);
        // Implementa la lógica de registro
      }
    } else {
      console.log('Formulario no válido');
    }
  }
}
