import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from "../services/login.service";
import { Login } from '../modelos/Login';
import { Registro } from '../modelos/Registro';
import { PerfilService } from "../services/perfil.service";
import { ToastService } from '../services/toast.service';

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

  constructor(private toastService: ToastService, private fb: FormBuilder, private router: Router, private loginService: LoginService, private perfilService: PerfilService) {
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

    if (!nombreUsuario && !contrasenia) {
      this.toastService.presentToast('Por favor, ingrese su nombre de correo/nombre de usuario y contraseña', 'error');
    } else if (!nombreUsuario) {
      this.toastService.presentToast('Por favor, ingrese su nombre de correo/nombre de usuario', 'error');
    } else if (!contrasenia) {
      this.toastService.presentToast('Por favor, ingrese su contraseña', 'error');
    } else {
      this.loginService.loguear({ nombreUsuario, contrasenia }).subscribe({
        next: (respuesta) => {
          const token = respuesta.token;
          sessionStorage.setItem("authToken", token);
          this.loginService.setAuthState(true);
          const rol = respuesta.rol;
          console.log(rol);

          this.perfilService.getEstadoBaneo().subscribe({
            next: (data) => {
              if (!data) {
                if (rol === "PERFIL") {

                  this.perfilService.getEstadoEntrada().subscribe({
                    next:(data) => {
                      if(data){
                        this.router.navigate(['/publicacion']);
                      }else if (!data){
                        this.router.navigate(['/categorias']);
                      }
                    },
                    error:()=>{
                      console.log("Error al obtener estado")
                    }
                  })
                } else if (rol === "ADMIN") {
                  this.router.navigate(['/administracion']);
                }
              } else if (data) {
                this.router.navigate(['/mensaje-ban']);
              }
            }
          });
        },
        error: (e) => {
          this.toastService.presentToast('Usuario/Correo o contraseña incorrectos', 'error');
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

    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|safareyes\.es|yopmail\.com)$/;    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/;
    let errorMessages = [];
    let missingFieldsCount = 0;

    if (!nombre) {
      errorMessages.push('Por favor, ingrese su nombre');
      missingFieldsCount++;
    }

    if (!apellidos) {
      errorMessages.push('Por favor, ingrese sus apellidos');
      missingFieldsCount++;
    }
    if (!correoElectronico) {
      errorMessages.push('Por favor, ingrese su correo electrónico');
      missingFieldsCount++;
    } else if (!emailPattern.test(correoElectronico)) {
      errorMessages.push('Por favor, ingrese un correo electrónico válido (@gmail.com o @safareyes.es)');
    }
    if (!fechaNacimiento) {
      errorMessages.push('Por favor, ingrese su fecha de nacimiento');
      missingFieldsCount++;
    }
    if (!nombreUsuario) {
      errorMessages.push('Por favor, ingrese su nombre de usuario');
      missingFieldsCount++;
    }
    if (!contrasenia) {
      errorMessages.push('Por favor, ingrese su contraseña');
      missingFieldsCount++;
    } else if (!passwordPattern.test(contrasenia)) {
      errorMessages.push('La contraseña debe tener entre 8 a 30 caracteres, incluir mayúsculas, minúsculas y números');
    }

    // else if (!passwordPattern.test(contrasenia)) {
    //   errorMessages.push('La contraseña debe tener entre 8 a 30 caracteres, incluir mayúsculas, minúsculas, números y símbolos');
    // }


    if (missingFieldsCount >= 2) {
      this.toastService.presentToast('Por favor, complete todos los campos', 'error');
    } else if (errorMessages.length > 0) {
      this.toastService.presentToast(errorMessages.join('. '), 'error');
    } else {
      this.loginService.registrar({ nombre, apellidos, correoElectronico, fechaNacimiento, nombreUsuario, contrasenia }).subscribe({
        next: (respuesta) => {
          console.info("Registro exitoso");
          this.toastService.presentToast('Se ha enviado un correo electronico de verificación a tu dirección Gmail', 'success');
        },
        error: (e: any) => {
          if (e.error && e.error.message) {
            this.toastService.presentToast(e.error.message, 'error');
          } else {
            this.toastService.presentToast('Nombre de usuario o correo ya en uso', 'error');
          }
        }
      });
    }
  }


  verificarCamposRecuperacion() {
    const correoElectronico = this.authForm.get('correoElectronico')?.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|safareyes\.es)$/;

    if (!correoElectronico) {
      this.toastService.presentToast('Por favor, ingrese su correo electrónico', 'error');
    } else if (!emailPattern.test(correoElectronico)) {
      this.toastService.presentToast('Por favor, ingrese un correo electrónico válido (@gmail.com o @safareyes.es)', 'error');
    } else {
      console.log('Recuperación de cuenta:', this.authForm.value);
      this.toggleAuthMode('confirmar');
    }
  }

  verificarCamposConfirmacion() {
    const codigo = this.authForm.get('codigo')?.value;

    if (!codigo) {
      this.toastService.presentToast('Por favor, ingrese el código de confirmación', 'error');
    } else if (codigo.toString().length !== 6) {
      this.toastService.presentToast('El código de confirmación debe tener exactamente 6 dígitos', 'error');
    } else {
      console.log('Confirmación de cuenta:', this.authForm.value);
      this.toggleAuthMode('nuevaContra');
    }
  }

  verificarContrasenas() {
    const nuevaContra = this.authForm.get('nuevaContra')?.value;
    const repitenuevaContra = this.authForm.get('repitenuevaContra')?.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

    if (!nuevaContra || !repitenuevaContra) {
      this.toastService.presentToast('Por favor, ingrese ambas contraseñas', 'error');
    } else if (nuevaContra !== repitenuevaContra) {
      this.toastService.presentToast('Las contraseñas no coinciden', 'error');
    } else if (!passwordPattern.test(nuevaContra)) {
      this.toastService.presentToast('La contraseña debe tener entre 8 a 30 caracteres, incluir mayúsculas, minúsculas, números y símbolos', 'error');
    }
  }

  reenviarCodigo() {
    console.log('Código reenviado');
  }
}
