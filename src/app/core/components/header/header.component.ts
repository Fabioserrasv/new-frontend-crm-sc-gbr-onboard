import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  public version = "Versão 6.14.2-SC - 14/09/2023"

  public notLefted = {
    "justify-content": "center",
    "align-items": "center"
  }

  public lefted = {
    "justify-content": "space-between",
    "align-items": "center",
    "padding-left": "20px",
    "border-bottom": "2px solid #808080"
  }

  @Input() signed: boolean = false

  public username = "Dr. Otacílo Marcondes Pedrosa";
  public crm = "CRM-SC 100292";

}
