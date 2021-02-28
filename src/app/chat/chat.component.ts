import { SocketIoService } from './../services/socket-io.service';
import { AuthService } from '@auth0/auth0-angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userList = [];
  userData;
  messages = [];
  sender = "";
  receiver = "";
  constructor(private auth: AuthService, private socketio: SocketIoService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(data => {

      localStorage.setItem("user", JSON.stringify(data));
      this.socketio.setupSocketConnection();
      this.socketio.getUserList(data);
      this.listenToUserList();
      this.listenToReceiveMessageSender();
      this.listenToReceiveMessageBoth();
      this.sender = data.email;
    });

  }

  getUserData() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    return this.userData;
  }

  getCredentials() {
    if(!localStorage.getItem("user")) {
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"))
    this.socketio.setupSocketConnection();
    this.socketio.getUserList(user);
    this.listenToUserList();
    this.listenToReceiveMessageSender();
    this.listenToReceiveMessageBoth();
    this.sender = user.email;
  }

  getMessages(receiver) {
    this.receiver = receiver;
    this.socketio.receiveMessage(this.sender, receiver)

  }

  listenToUserList() {
    this.socketio.socket.on('SendUserList', (data: []) => {
      this.userList = data;
      console.log(this.userList);
    });
  }

  listenToReceiveMessageSender() {
    this.socketio.socket.on("ReceiveMessageSender", (data) => {
         if(data.user === this.getUserData().email) {
            this.messages = data.messages.messages;
            console.log(this.messages);
         }
    });
  }

  listenToReceiveMessageBoth() {
    this.socketio.socket.on("ReceiveMessageBoth", (data) => {
      if(data.sender === this.getUserData().email || data.receiver === this.getUserData().email  ) {
        this.messages = data.messages.messages;
      }
 });
  }


  sendMessage(message) {
       this.socketio.sendMessage(message, this.sender, this.receiver);
  }

  logout() {
    this.socketio.logout(JSON.parse(localStorage.getItem("user")));
    this.auth.logout({ returnTo: '' });

  }

}
