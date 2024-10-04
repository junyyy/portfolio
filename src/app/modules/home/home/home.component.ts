import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { finalize, Observable, of, Subscription } from 'rxjs';
import {
  AuthService,
  TokenKeysEnum,
} from '../../../services/auth/auth.service';
import { S3Service } from '../../../services/s3/s3.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    MessageService,
    MessageService,
    ConfirmationService,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayChatbot: boolean = false;
  displayArchi: boolean = false;
  dockItems: MenuItem[] | undefined;
  menubarItems: any[] | undefined;
  responsiveOptions: any[] | undefined;
  images: any[] = [];
  nodes: any[] | undefined;
  subscription: Subscription | undefined;
  curDatetime: Date = new Date();
  timeOut: any = null;
  s3FileUrlMap: Map<string, string> = new Map();

  displayCv: boolean = false;
  cvPdfUrl: string = '';

  displayHegs: boolean = false;
  hegsPdfUrl: string = '';

  displayPfYr: boolean = false;
  pfYrPdfUrl: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private renderer: Renderer2,
    private s3Service: S3Service,
    private storage: StorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchDate();
    this.startDate();
    this.renderer.setStyle(document.documentElement, 'overflow', 'hidden');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    clearInterval(this.timeOut);
    this.timeOut = null;
    this.renderer.removeStyle(document.documentElement, 'overflow');
  }


  fetchDate() {
    this.dockItems = [
      {
        label: 'AI Chatbot',
        tooltipOptions: {
          tooltipLabel: 'AI Chatbot',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/demo/dock-icons/chatbot.svg',
        command: () => {
          this.displayChatbot = true;
        },
      },
      {
        label: 'Chat',
        tooltipOptions: {
          tooltipLabel: 'Chat',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/demo/dock-icons/walkie-talkie.svg',
        command: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Still working on...',
          });
        },
      },
    ];

    this.menubarItems = [
      {
        label: 'My CV',
        styleClass: 'menubar-root',
        command: () => {
          this.getS3FileSub('cv.pdf').subscribe((url) => {
            this.s3FileUrlMap.set('cv.pdf', url ?? '');
            this.cvPdfUrl = url ?? '';
            this.displayCv = true;
          });
        },
      },
      {
        label: 'Documentation',
        items: [
          {
            label: 'App structure',
            icon: 'pi pi-fw pi-pencil',
            command: () => {
              this.displayArchi = true;
            },
          },
          {
            label: 'Source code',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Frontend',
                icon: 'pi pi-fw pi-pencil',
                command: () => {
                  window.open('https://github.com/junyyy/portfolio', '_blank');
                },
              },
              {
                label: 'Backend',
                icon: 'pi pi-fw pi-pencil',
                command: () => {
                  window.open(
                    'https://github.com/junyyy/portfolio-lambda',
                    '_blank'
                  );
                },
              },
            ],
          },
        ],
      },
      {
        label: 'Certificates',
        items: [
          {
            label: 'HEGS',
            icon: 'pi pi-fw pi-pencil',
            command: () => {
              this.getS3FileSub('certificate.pdf').subscribe((url) => {
                this.s3FileUrlMap.set('certificate.pdf', url ?? '');
                this.hegsPdfUrl = url ?? '';
                this.displayHegs = true;
              });
            },
          },
          {
            label: 'Professional Year',
            icon: 'pi pi-fw pi-pencil',
            command: () => {
              this.getS3FileSub('professiona_year.pdf').subscribe((url) => {
                this.s3FileUrlMap.set('professiona_year.pdf', url ?? '');
                this.pfYrPdfUrl = url ?? '';
                this.displayPfYr = true;
              });
            },
          },
        ],
      },
      {
        label: 'Log out',
        command: () => {
          this.confirmationService.confirm({
            message: 'Are you sure that you want to log out?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
              this.authService
                .logout()
                .pipe(
                  finalize(() => {
                    this.authService.updateLoginResp = null;
                    this.storage.removeItem(TokenKeysEnum.accessTokenKey);
                    this.router.navigate(['/auth/login']);
                  })
                )
                .subscribe((_) => {});
            },
          });
        },
      },
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }

  startDate() {
    this.timeOut = setInterval(() => {
      this.curDatetime = new Date();
    }, 1000);
  }

  afterLoad($event: any) {
    console.log($event);
  }

  getS3FileSub(fileName: string): Observable<string | undefined> {
    return this.s3FileUrlMap.has(fileName)
      ? of(this.s3FileUrlMap.get(fileName))
      : this.s3Service.getS3ObjUrl(fileName);
  }
}
