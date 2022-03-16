import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Flight } from '../interfaces/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite obtener la lista de los vuelos de acuerdo a la ciudad de origen, ciudad de destino, número de pasajeros, fecha de salida
  getAllflight(originCity: string, destinationCity: string, numberPassenger: number, flightDate: Date) {
    const path = `http://localhost:8080/api/flight/${originCity}&&${destinationCity}&&${numberPassenger}&&selectedDate?flightDate=${flightDate}`;
    return this.http.get<Flight[]>(path);
  }

  getFlight(idflight: number) {
    const path = `http://localhost:8080/api/flight/search/${idflight}`;
    return this.http.get<Flight>(path);
  }
}
