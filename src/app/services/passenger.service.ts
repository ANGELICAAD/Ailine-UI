import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Passenger } from '../interfaces/passenger';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private apiServerURL = environment.apiBaseURL

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite crear o registrar nuevos pasajeros
  createPassenger(passenger: any) {
    const path = `${this.apiServerURL}/api/passenger`;
    return this.http.post(path, passenger);
  }

  // Método que permite validar la frecuencia de viaje de un pasajero, las millas que tiene acumuladas y las que va a acumular
  getvalidateFrequentFlyer(idPassenger: number, acumulateMiles: number) {
    const path = `${this.apiServerURL}/api/passenger/validate/${idPassenger}&&${acumulateMiles}`;
    return this.http.get<number[]>(path);
  }

  // Método que permite buscar a un pasajero por medio del id
  getFindPassenger(idPassenger: number) {
    const path = `${this.apiServerURL}/api/passenger/${idPassenger}`;
    return this.http.get<Passenger>(path);
  }

  getFindPassengerByDocument(document: string) {
    const path = `${this.apiServerURL}/api/passenger/search/${document}`;
    return this.http.get<Passenger>(path);
  }
}
 