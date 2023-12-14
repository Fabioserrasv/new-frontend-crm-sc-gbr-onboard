import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [ButtonComponent, HeaderComponent],
  exports: [ButtonComponent, HeaderComponent],
  imports: [
    CommonModule
  ]
})

export class CoreModule { }