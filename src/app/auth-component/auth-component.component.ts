import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule, IonModal } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { Login } from '../modelos/Login';
import { Registro } from '../modelos/Registro';

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
  registroForm: FormGroup;
  loginForm: FormGroup;
  login: Login = new Login();
  registro: Registro = new Registro();
  loginViewFlag: boolean = true;
  Logeado = true;
  Registrado = false;
  Recuperado = false;
  Confirmado = false;
  modalAbierto = false;
  mensajeModal = '';

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: [this.registro.nombre, Validators.required],
      apellidos: [this.registro.apellidos, Validators.required],
      mail: [this.registro.mail, [Validators.required, Validators.email]],
      fechaNacimiento: [this.registro.fechaNacimiento, Validators.required],
      usuario: [this.registro.usuario, Validators.required],
      contrasenia: [this.registro.contrasenia, Validators.required],
    });

    this.loginForm = this.fb.group({
      usuario: [this.login.usuario, Validators.required],
      contrasenia: [this.login.contrasenia, Validators.required],
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.authForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      nombre: [''],
      apellidos: [''],
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

  doLogin(): void {
    if (this.loginForm.valid) {
      this.login = { ...this.login, ...this.loginForm.value };
      this.loginService.loguear(this.login).subscribe({
        next: (respuesta) => {
          const token = respuesta.token;
          sessionStorage.setItem("authToken", token);
          this.loginService.setAuthState(true);
        },
        error: (e) => console.error(e),
        complete: () => this.router.navigate([''])
      });
    } else {
      console.log('Formulario inválido. Por favor verifica los datos.');
    }
  }

  doRegister() {
    if (this.registroForm.valid) {
      this.registro = { ...this.registro, ...this.registroForm.value };
      this.loginService.registrar(this.registro).subscribe({
        next: (respuesta) => console.info("registro exitoso"),
        error: (e) => console.error(e),
        complete: () => this.goLogin()
      });
    } else {
      console.log('Formulario inválido. Por favor verifica los datos.');
    }
  }

  goRegister() {
    this.loginViewFlag = false;
    this.ngOnInit();
  }

  goLogin() {
    this.loginViewFlag = true;
    this.ngOnInit();
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
    const usuario = this.authForm.get('usuario')?.value;
    const contrasenia = this.authForm.get('contrasenia')?.value;

    if (!usuario || !contrasenia) {
      this.mensajeModal = 'Por favor, ingrese su nombre de usuario/correo y contraseña';
      this.modalAbierto = true;
    } else {
      this.loginService.loguear({ usuario, contrasenia }).subscribe({
        next: (respuesta) => {
          const token = respuesta.token;
          sessionStorage.setItem("authToken", token);
          this.loginService.setAuthState(true);
          this.router.navigate(['/publicacion']);
        },
        error: (e) => {
          this.mensajeModal = 'Usuario o contraseña incorrectos';
          this.modalAbierto = true;
        }
      });
    }
  }

  verificarCamposRegistro() {
    const nombre = this.authForm.get('nombre')?.value;
    const apellidos = this.authForm.get('apellidos')?.value;
    const usuario = this.authForm.get('usuario')?.value;
    const contrasenia = this.authForm.get('contrasenia')?.value;
    const nuevaContra = this.authForm.get('nuevaContra')?.value;
    const repitenuevaContra = this.authForm.get('repitenuevaContra')?.value;
    const mail = this.authForm.get('mail')?.value;

    if (!nombre || !apellidos || !usuario || !contrasenia || !nuevaContra || !repitenuevaContra || !mail) {
      this.mensajeModal = 'Por favor, complete todos los campos';
      this.modalAbierto = true;
    } else if (nuevaContra !== repitenuevaContra) {
      this.mensajeModal = 'Las contraseñas no coinciden';
      this.modalAbierto = true;
    } else {
      this.loginService.registrar(this.registro).subscribe({
        next: (respuesta) => console.info("registro exitoso"),
        error: (e) => {
          this.mensajeModal = 'El correo electrónico o nombre de usuario ya está registrado';
          this.modalAbierto = true;
        },
        complete: () => this.goLogin()
      });
    }
  }

  verificarCamposRecuperacion() {
    const usuario = this.authForm.get('usuario')?.value;

    if (!usuario) {
      this.mensajeModal = 'Por favor, ingrese su nombre de usuario';
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
