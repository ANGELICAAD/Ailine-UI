import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Reserve } from '../interfaces/reserve';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(
    private http: HttpClient
  ) { }

  // Método que permite crear o registrar nuevas reservas
  createFlight(reserve: Reserve) {
    const path = 'http://localhost:8080/api/reserve';
    return this.http.post(path, reserve);
  }

  // Método que permite listar las reservas creadas
  getAllReservations() {
    const path = 'http://localhost:8080/api/reserve/';
    return this.http.get<Reserve[]>(path);
  }
}
