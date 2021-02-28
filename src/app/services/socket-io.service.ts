import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket;
  constructor() { }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');
  }


  //actions

  sendMessage(message : string, sender: string, receiver: string) {
    this.socket.emit('SendMessage', {message, sender, receiver});
  }

  receiveMessage(sender: string, receiver: string) {
    this.socket.emit('GetMessages', {sender, receiver});

  }

  getUserList(data) {
    this.socket.emit('GetUserList', data);
  }

  logout(data) {
    this.socket.emit('LogOut', data);
  }
}
