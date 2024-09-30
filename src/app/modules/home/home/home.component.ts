import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/terminal';
import { finalize, Subscription } from 'rxjs';
import { NodeService } from '../../../services/demo/node.service';
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
    TerminalService,
    NodeService,
    MessageService,
    ConfirmationService,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  displayTerminal: boolean = false;
  displayArchi: boolean = false;
  displayFinder: boolean = false;
  dockItems: MenuItem[] | undefined;
  menubarItems: any[] | undefined;
  responsiveOptions: any[] | undefined;
  images: any[] = [];
  nodes: any[] | undefined;
  subscription: Subscription | undefined;
  curDatetime: Date = new Date();
  timeOut: any = null;

  constructor(
    private authService: AuthService,
    private nodeService: NodeService,
    private messageService: MessageService,
    private terminalService: TerminalService,
    private confirmationService: ConfirmationService,
    private renderer: Renderer2,
    private s3Service: S3Service,
    private storage: StorageService,
    private router: Router
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

  commandHandler(text: any) {
    let response;
    let argsIndex = text.indexOf(' ');
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

    switch (command) {
      case 'date':
        response = 'Today is ' + new Date().toDateString();
        break;

      case 'greet':
        response = 'Hola ' + text.substring(argsIndex + 1) + '!';
        break;

      case 'random':
        response = Math.floor(Math.random() * 100);
        break;

      default:
        response = 'Unknown command: ' + command;
        break;
    }

    if (response) {
      this.terminalService.sendResponse(response as string);
    }
  }

  fetchDate() {
    this.dockItems = [
      {
        label: 'Terminal',
        tooltipOptions: {
          tooltipLabel: 'Terminal',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/demo/dock-icons/terminal.svg',
        command: () => {
          this.displayTerminal = true;
        },
      },
      {
        label: 'Game',
        tooltipOptions: {
          tooltipLabel: 'Game',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/demo/dock-icons/gamepad.svg',
        command: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Still working on...',
          });
        },
      },
      {
        label: 'GitHub',
        tooltipOptions: {
          tooltipLabel: 'GitHub',
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15,
          showDelay: 1000,
        },
        icon: 'assets/demo/dock-icons/github.svg',
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
        label: 'My Portfolio',
        styleClass: 'menubar-root',
        command: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Still working on...',
          });
        },
      },
      {
        label: 'Tech Doc',
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
              this.s3Service.getS3ObjUrl('certificate.pdf').subscribe((url) => {
                window.open(url, '_blank');
              });
            },
          },
          {
            label: 'Professional Year',
            icon: 'pi pi-fw pi-pencil',
            command: () => {
              this.s3Service
                .getS3ObjUrl('professiona_year.pdf')
                .subscribe((url) => {
                  window.open(url, '_blank');
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

    this.subscription = this.terminalService.commandHandler.subscribe(
      (command) => this.commandHandler(command)
    );

    this.nodeService.getFiles().then((data) => (this.nodes = data));
  }

  startDate() {
    this.timeOut = setInterval(() => {
      this.curDatetime = new Date();
    }, 1000);
  }
}
