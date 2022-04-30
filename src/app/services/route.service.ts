import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Route } from '../interfaces/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private apiServerURL = environment.apiBaseURL

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite obtener la lista de las ciudades de origen
  getAllOriginCities() {
    const path = `${this.apiServerURL}api/route/originCities`;
    return this.http.get<Route[]>(path);
  }

  // Método que permite obtener la lista de las ciudades de destino de acuerdo a una ciudad origen
  getAllDestinationCities(name: string) {
    const path = `${this.apiServerURL}api/route/destinationCities/${name}`;
    return this.http.get<Route[]>(path);
  }
}
