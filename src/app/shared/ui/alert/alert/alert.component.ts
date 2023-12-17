import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

type AlertType = "success" | "warning" | "danger"

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]
    )
  ],
})
export class AlertComponent {
  @Input() message: string = "";
  @Input() alertType?: AlertType = "success";

  public isOpen: boolean = false;

  alert(message: string, alertType: AlertType, timeOut: number = 5000): void {
    this.alertType = alertType;
    this.message = message;

    this.isOpen = true;

    setTimeout(() => {
      this.isOpen = false;
    }, timeOut);
  }
}
