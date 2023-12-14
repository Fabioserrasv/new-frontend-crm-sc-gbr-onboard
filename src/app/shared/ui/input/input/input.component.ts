import { Component, Input } from '@angular/core';

type InputTypes = "text" | "password" | "number" | "email" | "date";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})

export class InputComponent {
  @Input() name: string = "";
  @Input() placeholder: string = "";
  @Input() id: string = "";
  @Input() inputType: InputTypes = "text" as InputTypes;
  @Input() value?: any;
  @Input('ngModel') model: any;
}
