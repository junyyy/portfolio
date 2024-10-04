import { Injectable } from '@angular/core';
import { environment } from '../../comman/env';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatbotGroqService {
  constructor(private http: HttpClient) {}

  complete(content: string): Observable<GroqResp> {
    const url = `${environment.apiGatewayMain}/chatbot/complete`;
    const requestBody = {
      content,
    };
    return this.http.post<GroqResp>(url, requestBody);
  }
}

export interface GroqResp {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: GroqRespChoice[];
  usage: any;
  x_groq: any;
}

// TODO: complete the properties later
export interface GroqRespChoice {
  index: number;
  message: GroqRespChoiceMsg;
  logprobs: any;
  finish_reason: string;
}

export interface GroqResUsage {}

export interface GroqRespChoiceMsg {
  role: string;
  content: string;
}
