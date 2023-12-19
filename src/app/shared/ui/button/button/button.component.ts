import { Component, Input, ViewChild } from '@angular/core';
type ButtonType = "button" | "menu" | "reset" | "submit"
type StyleType = "normal" | "decline"
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() name: string = "";
  @Input() type: ButtonType = "button";
  @Input() customStyles: any = {};
  @Input() svgLogin: boolean = false
  @Input() styleType: StyleType = "normal"
}
