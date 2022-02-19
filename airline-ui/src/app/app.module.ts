import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InfoViajeComponent } from './info-viaje/info-viaje.component';
import { InfoVuelosComponent } from './info-vuelos/info-vuelos.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  // Clases y componentes
  declarations: [
    AppComponent,
    InfoViajeComponent,
    InfoVuelosComponent
  ],
  // Librerías
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
