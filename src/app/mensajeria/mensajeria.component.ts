import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { arrowBackCircle, personOutline, chatbubblesOutline, sendOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { WebSocketService } from '../services/websocket.service';
import { PerfilService } from '../services/perfil.service';
import { SeguidorDTO } from '../modelos/SeguidorDTO';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { HttpClient } from '@angular/common/http';

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
  messages: { [key: string]: any[] } = {};
  newMessage: string = '';
  roomId: string = '';
  seguidos: SeguidorDTO[] = [];
  filteredSeguidos: SeguidorDTO[] = [];
  seguidosCount: number = 0;
  currentSeguidor: SeguidorDTO | null = null;
  private messageSubscription: Subscription | null = null;
  private emisorId: number | null = null;

  constructor(
    private animationCtrl: AnimationController,
    private webSocketService: WebSocketService,
    private perfilService: PerfilService,
    private http: HttpClient
  ) {
    addIcons({ arrowBackCircle, personOutline, chatbubblesOutline, sendOutline });
  }

  ngOnInit() {
    this.cargarSeguidos();
    this.obtenerPerfilEmisor();
  }

  ngOnDestroy() {
    this.disconnectWebSocket();
  }

  obtenerPerfilEmisor() {
    this.perfilService.getIDPerfil().subscribe({
      next: (perfil) => {
        console.log('Perfil received:', perfil);
        this.emisorId = perfil.id;
        console.log('Emisor ID assigned:', this.emisorId);
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Request completed')
    });
  }

  cargarSeguidos() {
    this.perfilService.obtenerSeguidores().subscribe({
      next: (seguidos) => {
        console.log('Seguidos received:', seguidos);
        this.seguidos = seguidos.map(seguido => ({
          ...seguido,
          buttonDisabled: false
        }));
        this.filteredSeguidos = this.seguidos;
        this.seguidosCount = seguidos.length;
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Request completed')
    });
  }

  abrirChat(seguidorId: number) {
    this.disconnectWebSocket();
    this.currentSeguidor = this.seguidos.find(seguidor => seguidor.id === seguidorId) || null;

    if (this.emisorId === null) {
      console.error('Emisor ID is not defined');
      return;
    }

    this.roomId = this.generateRoomId(this.emisorId, seguidorId);

    // Fetch previous messages for the room
    this.http.get<any[]>(`/mensajes/room/${this.roomId}`).subscribe(messages => {
      this.messages[this.roomId] = messages;
    });

    if (!this.messages[this.roomId]) {
      this.messages[this.roomId] = [];
    }
    this.webSocketService.connect(this.roomId);
    this.messageSubscription = this.webSocketService.getMessages().pipe(
      filter(message => message.roomId === this.roomId)
    ).subscribe((message) => {
      this.messages[this.roomId].push(message);
    });
  }

  enviarMensaje() {
    if (this.newMessage.trim() === '') {
      return;
    }

    if (this.emisorId === null || this.currentSeguidor === null) {
      console.error('Emisor ID or Seguidor ID is not defined');
      return;
    }

    const message = {
      contenido: this.newMessage,
      roomId: this.roomId,
      usuarioEmisor: { id: this.emisorId },
      usuarioReceptor: { id: this.currentSeguidor.id }
    };
    this.webSocketService.enviarMensaje(message).subscribe(() => {
      this.messages[this.roomId].push(message); // Add the message to the list
      this.newMessage = '';
    });
  }

  disconnectWebSocket() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
      this.messageSubscription = null;
    }
    this.webSocketService.disconnect();
    this.roomId = '';
  }

  generateRoomId(emisorId: number, receptorId: number): string {
    return emisorId < receptorId ? `${emisorId}_${receptorId}` : `${receptorId}_${emisorId}`;
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) {
      return '';
    }

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
