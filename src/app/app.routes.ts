import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [

    {
        path: '',
        component: ChatComponent
    },
    {
        path: 'sidebar',
        component: SidebarComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    
];
