import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService, LoginResp, tokenKeys } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  form: FormGroup = new FormGroup({});
  messages: Message[] = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      file: [null],
    });
  }

  onSubmit() {
    const username = this.form.get('username')?.value;
    const pwd = this.form.get('password')?.value;
    this.authService
      .login(username, pwd)
      .subscribe({ next: (res: LoginResp) => {
        this.messages = [{ severity: 'info', detail: 'Logged in' }];
        this.storageService.setItem(tokenKeys.accessTokenKey, res.AccessToken??'');
        this.router.navigate(['/home']);
      }, error: (err) => {
        console.log(err)
        this.messages = [{ severity: 'error', detail: 'Logged in' }];
      }, complete: () => {} });
  }
}
