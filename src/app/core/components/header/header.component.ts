import { Component, Input } from '@angular/core';
import { User } from '../../entities/User';
import { getUserFromToken } from '../../../shared/utils/utils';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-share.service';

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

  public signed: boolean = false

  public username = "undefined";
  public crm = "undefined";
  private user: User

  constructor(private router: Router, private dataSharingService: DataSharingService) {
    this.dataSharingService.signed.subscribe(value => {
      this.signed = value;

      if (this.signed) {
        const token = localStorage.getItem("jwtToken");

        if (token) {
          this.user = getUserFromToken(token);
          this.username = this.user.nome;
          this.crm = this.user.crm;
        }
      }
    });
  }

  ngOnInit() {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      this.dataSharingService.signed.next(true);
    } else {
      this.dataSharingService.signed.next(false);
    }
  }

}
