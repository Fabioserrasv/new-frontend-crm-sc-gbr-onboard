import { Component, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../../../core/entities/User';
import { getUserFromToken } from '../../../../shared/utils/utils';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../shared/utils/routes';
import { HeaderComponent } from '../../../../core/components/header/header.component';
import { DataSharingService } from '../../../../core/services/data-share.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public username: string
  private user: User

  constructor(private _router: Router, private dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.user = getUserFromToken(localStorage.getItem('jwtToken')!)

    this.username = this.user.nome
  }

  logout() {
    localStorage.removeItem("jwtToken");
    this.dataSharingService.signed.next(false);
    this._router.navigateByUrl(ROUTES.AUTH.LOGIN)
  }

}
