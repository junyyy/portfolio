import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-web-browser',
  templateUrl: './web-browser.component.html',
  styleUrl: './web-browser.component.scss'
})
export class WebBrowserComponent implements OnInit {
  url: string = '';
  iframeUrl: SafeResourceUrl = '';
  constructor(public sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com');
    this.url =  'https://www.google.com';
    console.log(this.iframeUrl);

  }



  onEnterPress() {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log(this.iframeUrl);
  }

}
