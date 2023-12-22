import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from './core/services/data-share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Espaço Médico CRM-SC';

  public signed: boolean = false;

  constructor(private router: Router, private dataSharingService: DataSharingService) {
    this.dataSharingService.signed.subscribe(value => {
      this.signed = value;
    });
  }
}
