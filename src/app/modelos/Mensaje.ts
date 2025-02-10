export interface Mensaje {
  id?: number;
  contenido: string;
  fechaEnviado: string;
  horaEnviado: string;
  usuarioEmisor: { id: number };
  usuarioReceptor: { id: number };
  conversacionId: string;
}
