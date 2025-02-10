export interface Conversacion {
  id: number;
  usuario1Id: number;
  usuario2Id: number;
  nombrePerfil: string;
  fotoPerfil: string;
  ultimoMensaje: string;
  fechaUltimoMensaje: Date;
}
