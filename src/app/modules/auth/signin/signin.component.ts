import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Validators} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})


export class SigninComponent {
  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password:  ['', Validators.required],
      file: [null],
    })
  }

  onSubmit() {
    const username = this.form.get('username')?.value;
    const pwd =  this.form.get('password')?.value;
    this.authService.login(username, pwd);
  }
}
