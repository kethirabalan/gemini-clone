import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from '../service/chat.service';
import { GeminiService } from '../service/gemini.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,CommonModule,MatInputModule,],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  @ViewChild('chatMessages') private chatMessagesContainer: ElementRef | undefined;
  
  users = [
    { name: 'User1' },
    { name: 'User2' },
    { name: 'User3' }
  ];
  selectedUser: any = null;

  newMessage: string = '';
  messages: any[] = [];

  constructor(private geminiService: GeminiService) {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if (res) {
        this.messages.push(res);
        this.scrollToBottom();
      }
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.messages = [];
  }

  async sendMessage(): Promise<void> {
    if (this.newMessage.trim() === '') {
      return;
    }

    this.messages.push({ text: this.newMessage, from: 'user' });

    try {
      await this.geminiService.generateText(this.newMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    this.newMessage = '';
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatMessagesContainer) {
        this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}