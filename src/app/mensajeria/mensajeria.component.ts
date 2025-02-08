// src/app/mensajeria/mensajeria.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { arrowBackCircle, personOutline, chatbubblesOutline, micOutline, happyOutline, cameraOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class MensajeriaComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  newMessage: string = '';
  roomId: string = '1'; // Example roomId, you can change it dynamically

  constructor(private animationCtrl: AnimationController, private webSocketService: WebSocketService) {
    addIcons({ arrowBackCircle, personOutline, chatbubblesOutline, micOutline, happyOutline, cameraOutline });
  }

  ngOnInit() {
    this.webSocketService.connect(this.roomId);
    this.webSocketService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.webSocketService.disconnect();
  }

  sendMessage() {
    const message = {
      contenido: this.newMessage,
      roomId: this.roomId,
      usuarioEmisor: { id: 1 }, // Example user
      usuarioReceptor: { id: 2 } // Example user
    };
    this.webSocketService.sendMessage(this.roomId, message);
    this.newMessage = '';
  }

  entrarAnimacion = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root!.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root!.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

    return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(100)
        .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  dejarAnimacion = (baseEl: HTMLElement) => {
    return this.entrarAnimacion(baseEl).direction('reverse');
  };
}
