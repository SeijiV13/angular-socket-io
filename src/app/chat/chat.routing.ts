import { ChatComponent } from './chat.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ChatComponent
   },
];

export const ChatRoutes = RouterModule.forChild(routes);
