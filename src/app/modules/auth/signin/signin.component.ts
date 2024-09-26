import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})


export class SigninComponent {
  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: '',
      password: '',
    })
  }

  onSubmit() {
    console.log('submit');
  }
}
