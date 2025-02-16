import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { AnimationController, IonContent, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { arrowBackCircle, personOutline, chatbubblesOutline, sendOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { WebSocketService } from '../services/websocket.service';
import { PerfilService } from '../services/perfil.service';
import { MensajeService } from '../services/mensaje.service';
import { SeguidorDTO } from '../modelos/SeguidorDTO';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { CabeceraComponent } from "../cabecera/cabecera.component";
import { UltimoMensaje } from "../modelos/UltimoMensaje";

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CabeceraComponent,
  ]
})
export class MensajeriaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  messages: { [key: string]: any[] } = {};
  newMessage: string = '';
  ultimoMensaje: UltimoMensaje | null = null;
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
    private mensajeService: MensajeService
  ) {
    addIcons({ arrowBackCircle, personOutline, chatbubblesOutline, sendOutline });
  }

  ngOnInit() {
    this.cargarSeguidos();
    this.obtenerPerfilEmisor();
  }

  ngAfterViewInit() {
    // Ensure automatic scroll when the chat loads
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(0); // Try 500ms for a smoother scroll
      }
    }, 0); // Wait 300ms before executing the scroll
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
    this.mensajeService.obtenerMensajesPorRoomId(this.roomId).subscribe(messages => {
      // Sort messages by date
      messages.sort((a, b) => new Date(a.fechaEnviado).getTime() - new Date(b.fechaEnviado).getTime());

      // Group messages by date labels
      this.messages[this.roomId] = this.groupMessagesByDate(messages);
      this.scrollToBottom(); // Scroll to bottom after loading messages
    });

    if (!this.messages[this.roomId]) {
      this.messages[this.roomId] = [];
    }
    this.webSocketService.connect(this.roomId);
    this.messageSubscription = this.webSocketService.getMessages().pipe(
      filter(message => message.roomId === this.roomId)
    ).subscribe((message) => {
      this.addMessageToGroup(message);
      this.scrollToBottom(); // Scroll to bottom when a new message is received
    });

    this.cargarUltimoMensaje(); // Load the last message
    setTimeout(() => {
      this.scrollToBottom(); // Ensure scroll to bottom after loading the last message
    }, 100); // Adjust the timeout as needed
  }

  groupMessagesByDate(messages: any[]): any[] {
    const groupedMessages: any[] = [];
    let currentDateLabel = '';

    messages.forEach(message => {
      const dateLabel = this.getDateLabel(message.fechaEnviado);

      if (dateLabel !== currentDateLabel) {
        groupedMessages.push({ dateLabel, messages: [] });
        currentDateLabel = dateLabel;
      }

      groupedMessages[groupedMessages.length - 1].messages.push(message);
    });

    return groupedMessages;
  }

  getDateLabel(dateString: string): string {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);

    if (diffInDays < 1) {
      return 'Hoy';
    } else if (diffInDays < 2) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  }

  enviarMensaje() {
    if (this.newMessage.trim() === '') {
      return;
    }

    if (this.emisorId === null || this.currentSeguidor === null) {
      console.error('Emisor ID or Seguidor ID is not defined');
      return;
    }

    const now = new Date();
    const message = {
      contenido: this.newMessage,
      fechaEnviado: now.toISOString(),
      horaEnviado: now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      roomId: this.roomId,
      usuarioEmisor: { id: this.emisorId },
      usuarioReceptor: { id: this.currentSeguidor.id }
    };

    this.webSocketService.enviarMensaje(message).subscribe(() => {

      this.newMessage = '';
    });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.enviarMensaje();
    }
  }

  addMessageToGroup(message: any) {
    const dateLabel = this.getDateLabel(message.fechaEnviado);
    const group = this.messages[this.roomId].find((g: any) => g.dateLabel === dateLabel);

    if (group) {
      group.messages.push(message);
    } else {
      this.messages[this.roomId].push({ dateLabel, messages: [message] });
    }
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
      return 'Hoy';
    } else if (diffInDays < 2) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  }

  formatTime(timeString: string): string {
    const [hour, minute] = timeString.split(':');
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
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

  cargarUltimoMensaje() {
    const roomId = this.generateRoomId(this.emisorId!, this.currentSeguidor!.id!);
    this.mensajeService.obtenerUltimoMensajePorRoomId(roomId).subscribe({
      next: (mensaje: UltimoMensaje) => {
        this.ultimoMensaje = mensaje;
      },
      error: (error) => console.error('Error fetching last message:', error)
    });
  }

  searchTerm: string = '';

  filterContacts() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredSeguidos = this.seguidos.filter(seguidor =>
      seguidor.nombre?.toLowerCase().includes(searchTermLower)
    );
  }

}
