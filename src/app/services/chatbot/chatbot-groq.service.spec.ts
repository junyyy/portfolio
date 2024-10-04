import { TestBed } from '@angular/core/testing';

import { ChatbotGroqService } from './chatbot-groq.service';

describe('ChatbotGroqService', () => {
  let service: ChatbotGroqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotGroqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
