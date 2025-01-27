import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from '../navbar/navbar.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  ellipsisVerticalOutline,
  golfOutline,
  peopleCircleOutline,
  personCircleOutline,
  ribbonOutline,
  shareSocialOutline
} from 'ionicons/icons';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NavbarComponent,
    PiePaginaComponent,
  ]
})
export class PublicacionComponent implements OnInit {
  modalAbierto: boolean = false;
  mensajeModal: string = 'Crear una nueva publicación';

  constructor(private modalService: ModalService) {
    addIcons({ personCircleOutline, ribbonOutline, peopleCircleOutline, shareSocialOutline, ellipsisVerticalOutline, calendarOutline, golfOutline });
  }

  ngOnInit() {
    this.modalAbierto = this.modalService.isModalAbierto();
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.modalAbierto = this.modalService.isModalAbierto();
  }
}
