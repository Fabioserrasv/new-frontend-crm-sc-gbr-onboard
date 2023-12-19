import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrengthBarComponent } from './password-strength-bar/password-strength-bar.component';


@NgModule({
  declarations: [
    PasswordStrengthBarComponent
  ],
  exports: [
    PasswordStrengthBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PasswordStrengthBarModule { }
