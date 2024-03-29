import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Flight } from '../interfaces/flight';
import { FlightList } from '../interfaces/flightList';
import { FlightDTO } from '../interfaces/flightDTO';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private apiServerURL = environment.apiBaseURL

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite obtener la lista de los vuelos de acuerdo a la ciudad de origen, ciudad de destino, número de pasajeros, fecha de salida
  getAllflight(originCity: string, destinationCity: string, numberPassenger: number, flightDate: Date) {
    const path = `${this.apiServerURL}api/flight/${originCity}&&${destinationCity}&&${numberPassenger}&&selectedDate?flightDate=${flightDate}`;
    return this.http.get<FlightDTO[]>(path);
  }

  getFlight(idflight: number) {
    const path = `${this.apiServerURL}api/flight/search/${idflight}`;
    return this.http.get<Flight>(path);
  }
}
