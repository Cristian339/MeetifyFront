import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { Login } from '../modelos/Login';
import { Registro } from '../modelos/Registro';
import {PerfilService} from "../services/perfil.service";

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgOptimizedImage
  ]
})
export class AuthComponentComponent implements OnInit {
  @ViewChild('changePasswordModal') changePasswordModal!: IonModal;
  authForm: FormGroup = {} as FormGroup;
  loginForm: FormGroup;
  registroForm: FormGroup;
  login: Login = new Login();
  registro: Registro = new Registro();
  Logeado = true;
  Registrado = false;
  Recuperado = false;
  Confirmado = false;
  modalAbierto = false;
  mensajeModal = '';

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, private perfilService : PerfilService) {
    this.registroForm = this.fb.group({
      nombre: [this.registro.nombre, Validators.required],
      apellidos: [this.registro.apellidos, Validators.required],
      correoElectronico: [this.registro.correoElectronico, [Validators.required, Validators.email]],
      fechaNacimiento: [this.registro.fechaNacimiento, Validators.required],
      nombreUsuario: [this.registro.nombreUsuario, Validators.required],
      contrasenia: [this.registro.contrasenia, Validators.required],
    });

    this.loginForm = this.fb.group({
      nombreUsuario: [this.login.nombreUsuario, Validators.required],
      contrasenia: [this.login.contrasenia, Validators.required],
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.authForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      nombre: [''],
      apellidos: [''],
      correoElectronico: ['', [Validators.required, Validators.email]],
      fechaNacimiento: [''],
      codigo: [''],
      nuevaContra: ['', Validators.required],
      repitenuevaContra: ['', Validators.required]
    });

    if (this.Registrado) {
      this.authForm.get('contrasenia')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.authForm.get('repitenuevaContra')?.setValidators([Validators.required, this.matchPasswords.bind(this)]);
    } else {
      this.authForm.get('contrasenia')?.clearValidators();
      this.authForm.get('repitenuevaContra')?.clearValidators();
    }

    if (this.Confirmado) {
      this.authForm.get('codigo')?.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    } else {
      this.authForm.get('codigo')?.clearValidators();
    }

    this.authForm.get('contrasenia')?.updateValueAndValidity();
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
        this.verificarCamposLogin();
      } else if (this.Registrado) {
        this.verificarCamposRegistro();
      } else if (this.Recuperado) {
        this.verificarCamposRecuperacion();
      } else if (this.Confirmado) {
        this.verificarCamposConfirmacion();
      } else {
        this.verificarContrasenas();
      }
    } else {
      console.log('Formulario no válido');
      this.authForm.updateValueAndValidity();

    }
  }







  verificarCamposLogin() {
    const nombreUsuario = this.authForm.get('nombreUsuario')?.value;
    const contrasenia = this.authForm.get('contrasenia')?.value;

    if (!nombreUsuario || !contrasenia) {
      this.mensajeModal = 'Por favor, ingrese su nombre de nombreUsuario/correo y contraseña';
      this.modalAbierto = true;
    } else {
      this.loginService.loguear({ nombreUsuario, contrasenia }).subscribe({
        next: (respuesta) => {
          const token = respuesta.token;
          sessionStorage.setItem("authToken", token);
          this.loginService.setAuthState(true);
          const rol = respuesta.rol;
          console.log(rol);
          if(rol === "PERFIL"){
            this.router.navigate(['/publicacion']);
          }else if(rol === "ADMIN"){
            this.router.navigate(['/administracion']);
          }

        },
        error: (e) => {
          this.mensajeModal = 'Usuario/Correo o contraseña incorrectos';
          this.modalAbierto = true;
        }
      });
    }
  }




  verificarCamposRegistro() {
    const nombre = this.authForm.get('nombre')?.value;
    const apellidos = this.authForm.get('apellidos')?.value;
    const correoElectronico = this.authForm.get('correoElectronico')?.value;
    const fechaNacimiento = this.authForm.get('fechaNacimiento')?.value;
    const nombreUsuario = this.authForm.get('nombreUsuario')?.value;
    const contrasenia = this.authForm.get('contrasenia')?.value;

    if (!nombre || !apellidos || !correoElectronico || !fechaNacimiento || !nombreUsuario || !contrasenia) {
      this.mensajeModal = 'Por favor, complete todos los campos';
      this.modalAbierto = true;
    } else {
      this.loginService.registrar({ nombre, apellidos, correoElectronico, fechaNacimiento, nombreUsuario, contrasenia }).subscribe({
        next: (respuesta) => {
          console.info("Registro exitoso");
          // Pasamos el correo a CategoriasComponent mediante queryParams
          this.router.navigate(['/categorias'], { queryParams: { correoElectronico } });
        },
        error: (e: any) => {
          if (e.error && e.error.message) {
            this.mensajeModal = e.error.message;
          } else {
            this.mensajeModal = 'Error en el registro';
          }
          this.modalAbierto = true;
        }
      });
    }
  }


  verificarCamposRecuperacion() {
    const correoElectronico = this.authForm.get('correoElectronico')?.value;

    if (!correoElectronico) {
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
