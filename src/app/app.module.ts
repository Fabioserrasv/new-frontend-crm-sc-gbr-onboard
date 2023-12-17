import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataSharingService } from './core/services/data-share.service';

@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule, AppRoutingModule, CoreModule, BrowserAnimationsModule],
  providers: [
    provideClientHydration(),
    DataSharingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
