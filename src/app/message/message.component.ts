import { Component, ElementRef, ViewChild } from '@angular/core';
import { GeminiService } from '../service/gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @ViewChild('chatMessages') private chatMessagesContainer: ElementRef | undefined;
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
