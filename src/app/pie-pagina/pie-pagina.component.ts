import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { ModalService } from '../services/modal.service';

import {
  addCircleOutline,
  chatbubbleEllipsesOutline,
  homeOutline,
  notificationsOutline,
  personOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pie-pagina',
  templateUrl: './pie-pagina.component.html',
  styleUrls: ['./pie-pagina.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PiePaginaComponent implements OnInit {

  constructor(private router: Router, private modalService: ModalService) {
    addIcons({ chatbubbleEllipsesOutline, homeOutline, notificationsOutline, personOutline, addCircleOutline });
  }

  ngOnInit() {}

  abrirModal() {
    this.modalService.abrirModal();
    console.log('Modal abierto desde pie-pagina');
  }
}
