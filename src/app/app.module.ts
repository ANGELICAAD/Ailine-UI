import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InfoViajeComponent } from './info-viaje/info-viaje.component';
import { InfoVuelosComponent } from './info-vuelos/info-vuelos.component';
import { InfoPasajerosComponent } from './info-pasajeros/info-pasajeros.component';
import { InfoReservasComponent } from './info-reservas/info-reservas.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  // Clases y componentes
  declarations: [
    AppComponent,
    InfoViajeComponent,
    InfoVuelosComponent,
    InfoPasajerosComponent,
    InfoReservasComponent
  ],
  // Librerías
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
