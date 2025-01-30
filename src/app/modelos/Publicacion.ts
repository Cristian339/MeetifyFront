export class Publicacion {
  nombrePerfil?: string;
  categoria?: string;
  imageUrl?: string;
  titulo?: string;
  descripcion?: string;
  ubicacion?: string;
  fechaIni?: Date | string;
  fechaFin?: Date | string;

  constructor(data?: Partial<Publicacion>) {
    if (data) {
      this.nombrePerfil = data.nombrePerfil;
      this.categoria = data.categoria;
      this.imageUrl = data.imageUrl;
      this.titulo = data.titulo;
      this.descripcion = data.descripcion;
      this.ubicacion = data.ubicacion;
      this.fechaIni = data.fechaIni ? new Date(data.fechaIni).toISOString().split("T")[0] : undefined;
      this.fechaFin = data.fechaFin ? new Date(data.fechaFin).toISOString().split("T")[0] : undefined;
    }
  }
}
