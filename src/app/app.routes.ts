import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SidebarComponent } from './sidebar/sidebar.component';

export const routes: Routes = [

    {
        path: '',
        component: ChatComponent
    },
    {
        path: 'sidebar',
        component: SidebarComponent
    },
    
    
];
