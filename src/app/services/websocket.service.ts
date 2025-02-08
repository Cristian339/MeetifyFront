// src/app/services/websocket.service.ts
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
            webSocketFactory: () => new SockJS('http://localhost:8080/gs-guide-websocket'),
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

    sendMessage(roomId: string, message: any) {
        this.stompClient.publish({
            destination: `/app/enviarMensaje/${roomId}`,
            body: JSON.stringify(message)
        });
    }

    getMessages(): Observable<any> {
        return this.messageSubject.asObservable();
    }
}
