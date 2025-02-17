import { Categoria } from "./Categoria";

export class MiPuntuacion {
  nombreUsuario: string;
  imagenUrlPub: string;
  imagenUrlPerfil: string;
  estrellas: number;
  titulo: string;
  categoria: Categoria;

  constructor() {
    this.nombreUsuario = '';
    this.imagenUrlPub = '';
    this.imagenUrlPerfil = '';
    this.estrellas = 0;
    this.titulo = '';
    this.categoria = new Categoria();
  }
}
