import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Passenger } from '../interfaces/passenger';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite crear o registrar nuevos pasajeros
  createPassenger(passenger: any) {
    const path = 'http://localhost:8080/api/passenger';
    return this.http.post(path, passenger);
  }

  // Método que permite validar la frecuencia de viaje de un pasajero, las millas que tiene acumuladas y las que va a acumular
  getvalidateFrequentFlyer(idPassenger: number, acumulateMiles: number) {
    const path = `http://localhost:8080/api/passenger/validate/${idPassenger}&&${acumulateMiles}`;
    return this.http.get<string>(path);
  }

  // Método que permite buscar a un pasajero por medio del id
  getFindPassenger(idPassenger: number) {
    const path = `http://localhost:8080/api/passenger/${idPassenger}`;
    return this.http.get<Passenger>(path);
  }

  getFindPassengerByDocument(document: string) {
    const path = `http://localhost:8080/api/passenger/search/${document}`;
    return this.http.get<Passenger>(path);
  }
}
 