import { Component, OnInit } from '@angular/core';
import { SocketIoService } from './services/socket-io.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe(data => {
      console.log(data)
       if(!data) {
         this.auth.loginWithRedirect();
        }
   });
  }


}
