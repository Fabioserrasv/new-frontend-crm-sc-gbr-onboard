import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from '../../core/interceptors/jwt.interceptor';
import { ButtonModule } from '@ui';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    ButtonModule
  ],
  providers: [provideHttpClient(withInterceptors([jwtInterceptor]))]
})
export class FinanceModule { }
