import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoutes } from './chat.routing';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutes
  ]
})
export class ChatModule { }
