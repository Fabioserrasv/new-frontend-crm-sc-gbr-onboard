import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchInputComponent } from './switch-input/switch-input.component';



@NgModule({
  declarations: [SwitchInputComponent],
  exports: [SwitchInputComponent],
  imports: [
    CommonModule
  ]
})
export class SwitchInputModule { }
