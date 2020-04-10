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

  constructor() { }

  ngOnInit() {
    this.client = new Client();
    this.client.webSocketFactory = () => {
      return new SockJS('http://localhost:8080/chat-websocket');
    };

    this.client.onConnect = (frames) => {
      console.log('Conectados: ' + this.client.connected + ' : ' + frames);
    };
    // para conectadornos
    this.client.activate();

  }

}
