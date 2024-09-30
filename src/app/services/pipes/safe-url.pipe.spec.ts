import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';
import { inject } from '@angular/core';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeUrlPipe(inject(DomSanitizer));
    expect(pipe).toBeTruthy();
  });
});
