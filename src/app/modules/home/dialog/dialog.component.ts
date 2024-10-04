import { Component, OnInit } from '@angular/core';
import {
  ChatbotGroqService,
  GroqResp,
} from '../../../services/chatbot/chatbot-groq.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  disableSendBtn: boolean = false;

  constructor(private chatService: ChatbotGroqService) {}
  ngOnInit(): void {
    this.pushMsg(
      'Note: a free api key is provided by Groq, it might not be avaialble in future ',
      'other'
    );
  }
  userMessage: string = '';
  messages: { sender: string; text: string; time: string }[] = [];

  response: string = '';

  sendMessage() {
    if (this.userMessage.trim() !== '') {
      const content = this.userMessage.trim();
      this.userMessage = '';
      this.disableSendBtn = true;
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      // TODO: consider to use a behaviour subject
      this.messages.push({
        sender: 'user',
        text: content,
        time: currentTime,
      });
      this.pushMsg('thinking...', 'other');
      this.chatService.complete(content).subscribe({
        next: (resp: GroqResp) => {
          if (
            resp &&
            resp.choices &&
            resp.choices[0] &&
            resp.choices[0].finish_reason === 'stop'
          ) {
            // TODO: format the content
            this.messages.pop();
            this.pushMsg(resp.choices[0].message.content, 'other');
          }
        },
        error: (e) => {
          this.messages.pop();
          this.pushMsg('something went wrong: ', 'other');
          console.warn(e);
        },
        complete: () => {
          this.disableSendBtn = false;
        },
      });
    }
  }

  pushMsg(msg: string, sender: 'user' | 'other') {
    this.messages.push({
      sender: sender,
      text: msg,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  }
}
