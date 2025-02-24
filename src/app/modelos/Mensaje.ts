export interface Mensaje {
  id?: number;
  contenido: string;
  fechaEnviado: string;
  horaEnviado: string;
  usuarioEmisor: { id: number };
  usuarioReceptor: { id: number };
  cssClass?: string; // Add this line to include the cssClass property
  /*conversacionId: string;*/
}
