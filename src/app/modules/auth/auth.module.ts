import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ButtonModule, InputModule, ModalModule, AlertModule, PasswordStrengthBarModule } from '@ui';
import { LoginComponent } from './pages/login/login.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { ForgetPassModalComponent } from './components/forget-pass-modal/forget-pass-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { CrmApiService } from './services/crm-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterModalComponent,
    ForgetPassModalComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputModule,
    ButtonModule,
    ModalModule,
    AlertModule,
    PasswordStrengthBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    CrmApiService,
    AuthService,
    provideNgxMask(),
  ]
})
export class AuthModule { }
