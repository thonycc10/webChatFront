import {Component, OnInit} from '@angular/core';
import {Client} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private client: Client;
  conectado: boolean = false;
  constructor() { }

  ngOnInit() {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/chat-websocket');
    };

    this.client.onConnect = (frames) => {
      console.log('Conectados: ' + this.client.connected + ' : ' + frames);
      this.conectado = true;
    };
    // para conectadornos
    this.client.onDisconnect = (frames) => {
      console.log('Desconectados: ' + !this.client.connected + ' : ' + frames);
      this.conectado = false;
    }
  }

  conectar(): void {
    this.client.activate();

  }

  desConectar(): void {
    this.client.deactivate();
  }

}
