import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { arrowBackCircle, personOutline, chatbubblesOutline, sendOutline, addCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { WebSocketService } from '../services/websocket.service';
import { MensajeService } from '../services/mensaje.service';
import { Conversacion } from '../modelos/Conversacion';
import { Mensaje } from '../modelos/Mensaje';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ]
})
export class MensajeriaComponent implements OnInit, OnDestroy {
  messages: { [key: string]: Mensaje[] } = {};
  newMessage: string = '';
  conversacionId: string = '';
  conversaciones: Conversacion[] = [];
  currentConversacion: Conversacion | null = null;
  private messageSubscription: Subscription | null = null;
  currentUserId: number = 1; // Replace with the actual current user ID

  constructor(
    private animationCtrl: AnimationController,
    private webSocketService: WebSocketService,
    private mensajeService: MensajeService
  ) {
    addIcons({ arrowBackCircle, personOutline, chatbubblesOutline, sendOutline, addCircleOutline });
  }

  ngOnInit() {
    this.cargarConversaciones();
  }

  ngOnDestroy() {
    this.disconnectWebSocket();
  }

  cargarConversaciones() {
    const idPerfil = this.currentUserId; // Replace with actual profile ID
    this.mensajeService.getConversacionesByIdPerfil(idPerfil).subscribe((conversaciones: Conversacion[]) => {
      this.conversaciones = conversaciones;
    });
  }

  abrirChat(conversacion: Conversacion) {
    this.disconnectWebSocket();
    this.currentConversacion = conversacion;
    this.conversacionId = conversacion.id.toString(); // Use a unique identifier for the conversation

    // Fetch previous messages for the conversation
    this.mensajeService.obtenerMensajesPorConversacionId(Number(this.conversacionId)).subscribe(messages => {
      this.messages[this.conversacionId] = messages;
    });

    if (!this.messages[this.conversacionId]) {
      this.messages[this.conversacionId] = [];
    }
    this.webSocketService.connect(this.conversacionId);
    this.messageSubscription = this.webSocketService.getMessages().pipe(
      filter(message => message.conversacionId === this.conversacionId)
    ).subscribe((message: Mensaje) => {
      this.messages[this.conversacionId].push(message);
    });
  }

  iniciarNuevaConversacion() {
    this.currentConversacion = null;
    this.conversacionId = 'new';
    this.messages[this.conversacionId] = [];
  }

  enviarMensaje() {
    if (this.newMessage.trim() === '') {
      return;
    }
    const receptorId = this.currentConversacion?.usuario2Id; // Obtener el ID del receptor actual

    if (!receptorId) {
      console.error('Receptor ID is not defined');
      return;
    }

    const message: Mensaje = {
      contenido: this.newMessage,
      usuarioEmisor: { id: this.currentUserId }, // ID del usuario emisor (current user)
      usuarioReceptor: { id: receptorId }, // ID del usuario receptor (selected receptor)
      conversacionId: this.conversacionId,
      fechaEnviado: new Date().toISOString(),
      horaEnviado: new Date().toISOString()
    };

    this.webSocketService.enviarMensaje(message).subscribe((response: any) => {
      this.conversacionId = response.conversacionId; // Use the conversacionId returned from the backend
      this.newMessage = '';
    });
  }

  disconnectWebSocket() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
      this.messageSubscription = null;
    }
    this.webSocketService.disconnect();
    this.conversacionId = '';
  }

  formatDate(dateString: string): string {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);

    if (diffInDays < 1) {
      return 'Ahora';
    } else if (diffInDays < 2) {
      return 'Ayer';
    } else if (diffInDays < 7) {
      return formatDistanceToNow(date, { locale: es });
    } else {
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
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
