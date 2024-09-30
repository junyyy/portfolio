import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { DockModule } from 'primeng/dock';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import { TerminalModule } from 'primeng/terminal';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ArchitectureComponent } from './architecture/architecture.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [HomeComponent, ArchitectureComponent, ChatComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    DockModule,
    MenubarModule,
    DialogModule,
    TreeModule,
    ToastModule,
    GalleriaModule,
    TerminalModule,
    ConfirmDialogModule,
    InputTextModule,
    ProgressSpinnerModule,
  ],
})
export class HomeModule {}
