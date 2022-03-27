import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  async login() {
    if (this.form.valid) {
      const { login, password } = this.form.getRawValue();
      await this.loginService.login(login, password);
    }
  }
}
