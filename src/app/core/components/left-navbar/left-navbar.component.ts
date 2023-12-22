import { Component } from '@angular/core';
import { DataSharingService } from '../../services/data-share.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../../config/routes';

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrl: './left-navbar.component.scss'
})
export class LeftNavbarComponent {

  public isSigned: boolean = false;
  constructor(private _router: Router, private dataSharingService: DataSharingService) {
    this.dataSharingService.signed.subscribe(value => {
      this.isSigned = value;
    })
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("jwtToken");
      this.dataSharingService.signed.next(false);
      this._router.navigateByUrl(ROUTES.AUTH.LOGIN)
    }
  }
}
