import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { FinanceRoutingModule } from './modules/finance/finance-routing.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule, FinanceRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
