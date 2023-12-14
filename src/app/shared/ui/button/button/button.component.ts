import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() name: string = "";
  @Input() customStyles: any = {};

  onClick() {
    console.log("clicou")
  }
}
