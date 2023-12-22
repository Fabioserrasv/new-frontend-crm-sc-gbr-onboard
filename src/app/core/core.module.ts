import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LeftNavbarComponent } from './components/left-navbar/left-navbar.component';
import { SwitchInputModule } from '@ui';

@NgModule({
  declarations: [HeaderComponent, LeftNavbarComponent],
  exports: [HeaderComponent, LeftNavbarComponent],
  imports: [
    CommonModule,
    SwitchInputModule
  ]
})

export class CoreModule { }
