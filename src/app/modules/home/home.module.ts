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
import { WebBrowserComponent } from './web-browser/web-browser.component';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    HomeComponent,
    WebBrowserComponent
  ],
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
    InputTextModule
  ]
})
export class HomeModule { }
