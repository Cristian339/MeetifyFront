import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private messageSubject = new Subject<any>();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('https://meetifybackj.onrender.com/gs-guide-websocket'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log(str)
    });

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };
  }

  connect(roomId: string) {
    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      this.stompClient.subscribe(`/topic/mensajes/${roomId}`, (message: Message) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    };
    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }

  enviarMensaje(message: any): Observable<any> {
    return new Observable(observer => {
      this.stompClient.publish({
        destination: `/app/enviarMensaje/${message.roomId}`,
        body: JSON.stringify(message)
      });
      observer.next({ roomId: message.roomId });
      observer.complete();
    });
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }



}
