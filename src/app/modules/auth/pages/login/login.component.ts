import { Component, ViewChild } from '@angular/core';
import { RegisterModalComponent } from '../../components/register-modal/register-modal.component';
import { ForgetPassModalComponent } from '../../components/forget-pass-modal/forget-pass-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../shared/utils/routes';
import { AlertComponent } from '@ui/alert/alert/alert.component';
import { AuthService } from '../../services/auth.service';
import { DataSharingService } from '../../../../core/services/data-share.service';

export type LoginForm = {
  email: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild(RegisterModalComponent) modal: any;
  @ViewChild(ForgetPassModalComponent) modalForgetPassword: any;
  @ViewChild(AlertComponent) alert: any;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  constructor(private _router: Router, private authService: AuthService, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    if (localStorage.getItem('jwtToken')) {
      this._router.navigateByUrl(ROUTES.FINANCE.HOME);
    }
  }

  openRegisterModal() {
    this.modal.openModal(this.alert);
  }

  openForgetPasswordModal() {
    this.modalForgetPassword.openModal();
  }

  async login() {
    if (this.loginForm.invalid) return;

    if (await this.authService.login(this.loginForm.value as LoginForm)) {
      this.dataSharingService.signed.next(true);
      this._router.navigateByUrl(ROUTES.FINANCE.HOME);
    }
  }
}
