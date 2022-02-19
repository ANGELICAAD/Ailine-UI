import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Route } from '../interfaces/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite obtener la lista de las ciudades de origen
  getAllOriginCities() {
    const path = 'http://localhost:8080/api/route/originCities';
    return this.http.get<Route[]>(path);
  }

  // Método que permite obtener la lista de las ciudades de destino de acuerdo a una ciudad origen
  getAllDestinationCities(name: string) {
    const path = `http://localhost:8080/api/route/destinationCities/${name}`;
    return this.http.get<Route[]>(path);
  }
}
