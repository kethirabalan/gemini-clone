import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule,MatCardModule,FormsModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  chatHistory = [
    { title: 'Chat 1' },
    { title: 'Chat 2' },
    // Add more chat history items as needed
  ];

  createNewPrompt() {
    // Logic to create a new prompt
    console.log('New Prompt Button Clicked');
  }
}