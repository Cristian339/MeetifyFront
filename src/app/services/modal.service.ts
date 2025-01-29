import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalAbierto = new Subject<boolean>();

  abrirModal() {
    this.modalAbierto.next(true);
  }

  cerrarModal() {
    this.modalAbierto.next(false);
  }

  getModalStatus() {
    return this.modalAbierto.asObservable();
  }
}
