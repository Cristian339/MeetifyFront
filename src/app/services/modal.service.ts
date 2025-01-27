import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalAbierto: boolean = false;

  abrirModal() {
    this.modalAbierto = true;
    console.log('Modal abierto');
  }

  cerrarModal() {
    this.modalAbierto = false;
    console.log('Modal cerrado');
  }

  isModalAbierto(): boolean {
    return this.modalAbierto;
  }
}
