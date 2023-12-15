import { Component, ViewChild } from '@angular/core';
import { AuthModule } from '../../auth.module';
import { RegisterModalComponent } from '../../components/register-modal/register-modal.component';
import { ForgetPassModalComponent } from '../../components/forget-pass-modal/forget-pass-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../shared/utils/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  @ViewChild(RegisterModalComponent) modal: any;
  @ViewChild(ForgetPassModalComponent) modalForgetPassword: any;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  constructor(private _router: Router) {
    this.loginForm.valueChanges.subscribe((value) => {
      console.log(value)
    })
  }

  openRegisterModal() {
    this.modal.openModal();
  }

  openForgetPasswordModal() {
    this.modalForgetPassword.openModal();
  }

  login() {
    // if (this.loginForm.invalid) return;
    this._router.navigateByUrl(ROUTES.FINANCE.HOME)
  }
}
